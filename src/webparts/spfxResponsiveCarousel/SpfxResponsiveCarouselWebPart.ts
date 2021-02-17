import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "SpfxResponsiveCarouselWebPartStrings";
import SpfxResponsiveCarousel from "./components/SpfxResponsiveCarousel";
import { ISpfxResponsiveCarouselProps } from "./components/ISpfxResponsiveCarouselProps";
import { sp } from "@pnp/sp";

export interface ISpfxResponsiveCarouselWebPartProps {
  description: string;
}

export default class SpfxResponsiveCarouselWebPart extends BaseClientSideWebPart<ISpfxResponsiveCarouselWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      // other init code may be present

      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISpfxResponsiveCarouselProps> = React.createElement(
      SpfxResponsiveCarousel,
      {
        description: this.properties.description,
        url: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //@ts-ignore
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
