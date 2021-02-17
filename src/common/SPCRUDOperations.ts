// Following reusalbe library built on v2 of pnp js: https://pnp.github.io/pnpjs/

import { SPRest } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/views";
import "@pnp/sp/fields";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/site-groups";
import "@pnp/sp/site-users/web";
// import "@pnp/polyfill-ie11";
import "@pnp/common/util";
import { Web } from "@pnp/sp/webs";

class SPOperations {
  constructor() {}
  //#region Create items in list

  public static async createItemInList(
    sp: SPRest,
    listName: string,
    newItem: any
  ) {
    debugger;
    let item = await sp.web.lists.getByTitle(listName).items.add(newItem);
    return item;
  }
  //#endregion End of Create items in list

  //#region Create items in list by using Id

  public static async createItemInListByUsingId(
    sp: SPRest,
    listId: string,
    newItem: any,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    let item = await _web.lists.getById(listId).items.add(newItem);
    return item;
  }
  //#endregion End of Create items in list

  /**
   *
   * @param sp provide SP object from PNPJS
   * @param listName Provide list display name
   */
  public static async getAllItemsInList(sp: SPRest, listName: string) {
    let items = await sp.web.lists.getByTitle(listName).select("*").items.get();
    return items;
  }
  /**
   *
   * @param sp  provide SP object from PnPJS
   * @param listName  Provide List Name
   * @param selectQuery  Provide $select fileds optional
   * @param filterQuery  Provide $filter fields optional
   * @param expandFields  provide $expand fields optional
   */
  public static async getAllItemsInListWithFilter(
    sp: SPRest,
    listName: string,
    selectQuery?: string,
    filterQuery?: string,
    expandFields?: string,
    sortingField?: string,
    ascending?: boolean,
    top?: number
  ) {
    let topItemsToGet = top || 4999;
    let items = await sp.web.lists
      .getByTitle(listName)
      .items.select(selectQuery)
      .filter(filterQuery ? filterQuery : "")
      .expand(expandFields)
      .orderBy(sortingField ? sortingField : "", ascending)
      .top(topItemsToGet)
      .get();
    return items;
  }
  /**
   *
   * @param sp sp object
   * @param listName provide list display name
   * @param selectQuery fields to select with comma separated
   * @param filterQuery filter condtions with comma separated
   * @param expandFields fields to expand with comma separated
   * @param sortingField field to sort
   * @param ascending boolean value
   * @param top number of records to retrieve
   */
  public static async getPagedItemsInListWithFilter(
    sp: SPRest,
    listName: string,
    selectQuery?: string,
    filterQuery?: string,
    expandFields?: string,
    sortingField?: string,
    ascending?: boolean,
    top?: number
  ) {
    let topItemsToGet = top || 4999;
    let items = await sp.web.lists
      .getByTitle(listName)
      .items.select(selectQuery)
      .filter(filterQuery ? filterQuery : "")
      .expand(expandFields)
      .orderBy(sortingField ? sortingField : "", ascending)
      .top(topItemsToGet)
      .getPaged();
    return items;
  }

  /*  get items from a list by using guid */
  /**
   *
   * @param sp sp object
   * @param listID provide list id
   * @param selectQuery fields to select with comma separated
   * @param filterQuery filter condtions with comma separated
   * @param expandFields fields to expand with comma separated
   * @param sortingField field to sort
   * @param ascending boolean value
   * @param top number of records to retrieve
   */

  public static async getAllItemsInListByUsingIdWithFilter(
    sp: SPRest,
    listID: string,
    selectQuery?: string,
    filterQuery?: string,
    expandFields?: string,
    sortingField?: string,
    ascending?: boolean,
    top?: number,
    web?: any
  ) {
    let topItemsToGet = top || 4999;
    let _web = web ? web : sp.web;
    let items = await _web.lists
      .getById(listID)
      .items.select(selectQuery)
      .filter(filterQuery ? filterQuery : "")
      .expand(expandFields)
      .orderBy(sortingField ? sortingField : "", ascending)
      .top(topItemsToGet)
      .get();
    return items;
  }

  public static async getItemById(
    sp: SPRest,
    listName: string,
    id: number,
    selectFields?: string,
    expandFields?: string
  ) {
    let item = sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .select(selectFields)
      .expand(expandFields)
      .get();
    return item;
  }

  public static async updateItemInList(
    sp: SPRest,
    listName: string,
    id: number,
    updateProperties: any
  ) {
    let item = sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .update(updateProperties);

    return item;
  }

  public static async updateItemInListByUsingId(
    sp: SPRest,
    listId: string,
    id: number,
    updateProperties: any,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    let item = _web.lists
      .getById(listId)
      .items.getById(id)
      .update(updateProperties);

    return item;
  }

  public static async deleteItemFromList(sp: SPRest, listName, id) {
    let item = await sp.web.lists
      .getByTitle(listName)
      .items.getById(id)
      .delete();
    return item;
  }

  public static async deleteItemFromListById(
    sp: SPRest,
    listId,
    id,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    let item = await _web.lists.getById(listId).items.getById(id).delete();
    return item;
  }

  public static async createFolderInLibrary(
    sp: SPRest,
    libraryUrl: string,
    folderName: string
  ) {
    let item = await sp.web
      .getFolderByServerRelativeUrl(libraryUrl)
      .folders.add(folderName);
    return item;
  }

  public static async addDocumentToFolder(
    sp: SPRest,
    folderUrl: string,
    documentName: string,
    documentBlob: Blob,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    let item = _web
      .getFolderByServerRelativeUrl(folderUrl)
      .files.add(documentName, documentBlob);
    return item;
  }
  public static async deleteDocumentFromFolder(
    sp: SPRest,
    fileRelativeUrl: string
  ) {
    let item = sp.web.getFileByServerRelativePath(fileRelativeUrl).delete();

    return item;
  }
  public static async uploadAttachments(
    sp: SPRest,
    listName: string,
    itemId,
    fileInfos
  ) {
    const list = sp.web.lists.getByTitle(listName);
    return list.items.getById(itemId).attachmentFiles.addMultiple(fileInfos);
  }

  public static async uploadSingleAttachmentsByListId(
    sp: SPRest,
    listId: string,
    itemId,
    fileName,
    fileInfos,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    const list = _web.lists.getById(listId);
    return list.items.getById(itemId).attachmentFiles.add(fileName, fileInfos);
  }

  public static async getAttachments(sp: SPRest, listName: string, itemId) {
    const list = sp.web.lists.getByTitle(listName);
    return list.items.getById(itemId).attachmentFiles.get();
  }
  public static async deleteAttachments(
    sp: SPRest,
    listName: string,
    itemId,
    fileNames: string[]
  ) {
    const list = sp.web.lists.getByTitle(listName);
    return list.items
      .getById(itemId)
      .attachmentFiles.deleteMultiple(...fileNames);
  }
  public static async deleteAttachment(
    sp: SPRest,
    listName: string,
    itemId,
    fileName: string
  ) {
    const list = sp.web.lists.getByTitle(listName);
    return list.items
      .getById(itemId)
      .attachmentFiles.getByName(fileName)
      .delete();
  }

  public static async getUsersFromGroup(sp: SPRest, groupId: number) {
    return sp.web.siteGroups.getById(groupId).users.get();
  }
  public static async getFileInfo(sp: SPRest, fileUrl: string) {
    return sp.web.getFileByServerRelativeUrl(fileUrl).get();
  }

  public static async getCurrentUserGroups(sp: SPRest) {
    return sp.web.currentUser.groups();
  }

  public static async getLoginUser(sp: SPRest, userName: any) {
    let item = await sp.web.ensureUser(userName);
    return item;
  }
  public static async getRepositoryServerRelativeUrlById(
    sp: SPRest,
    folderId: string,
    web?: any
  ) {
    let _web = web ? web : sp.web;
    return _web.lists
      .getById(folderId)
      .select("Title,RootFolder/ServerRelativeUrl")
      .expand("RootFolder")
      .get();
  }

  public static async getCurrentUser(sp: SPRest, web?: any) {
    let _web = web ? web : sp.web;
   let userDetails=  _web.currentUser();
   return userDetails;
  }
}

export default SPOperations;
