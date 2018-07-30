"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-wysiwyg/ht-wysiwyg-viewer.js";

class HTUserAbout extends LitElement {
  _render({ data }) {
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
    
      [hidden] {
        display: none
      }
    </style>
    <div id="container">
        <ht-wysiwyg-viewer data=${data.description}></ht-wysiwyg-viewer>
    </div>`;
  }

  static get is() {
    return "ht-user-about";
  }

  static get properties() {
    return {
      data: Object
    };
  }
}

customElements.define(HTUserAbout.is, HTUserAbout);
