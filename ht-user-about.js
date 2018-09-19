"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-wysiwyg/ht-wysiwyg-viewer.js";
import "@01ht/ht-nothing-found-placeholder";

class HTUserAbout extends LitElement {
  render() {
    const { data } = this;
    return html`
    <style>
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }
    
      #container {
        display: flex;
        flex-direction: column;
        margin: auto;
      }
    
      [hidden], [hide] {
        display: none
      }

      ht-nothing-found-placeholder {
        display:none
      }

      ht-nothing-found-placeholder[show] {
        display: block;
      }
    </style>
    <div id="container">
      <ht-nothing-found-placeholder main="Нет информации" ?show=${
        data.description === '{"ops":[{"insert":"\\n"}]}' ||
        data.description === "{}"
          ? true
          : false
      }></ht-nothing-found-placeholder>
      <ht-wysiwyg-viewer .data=${data.description}></ht-wysiwyg-viewer>
    </div>`;
  }

  static get is() {
    return "ht-user-about";
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }
}

customElements.define(HTUserAbout.is, HTUserAbout);
