"use strict";
import { LitElement, html, css } from "lit-element";
import "@01ht/ht-elements-catalog/ht-elements-catalog-list.js";
import "@01ht/ht-spinner";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTUserPortfolio extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        #container {
          display: flex;
          flex-direction: column;
          margin: auto;
        }

        [hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { loading, cartChangeInProcess } = this;
    return html`
    <div id="container">
        <ht-spinner ?hidden="${!loading}" page></ht-spinner>
        <ht-elements-catalog-list view="grid" ?hidden="${loading}" .cartChangeInProcess="${cartChangeInProcess}" portfolio></ht-elements-catalog-list>
    </div>`;
  }

  static get properties() {
    return {
      data: { type: Object },
      loading: { type: Boolean },
      cartChangeInProcess: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = true;
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("data")) this._setData(this.data);
    return true;
  }

  async _setData(data) {
    try {
      this.loading = true;
      let items = [];
      const snapshot = await firebase
        .firestore()
        .collection("items")
        .where("ownerId", "==", data.uid)
        .get();
      snapshot.forEach(doc => {
        const data = doc.data();
        data.itemId = doc.id;
        if (data.published) items.push(data);
      });
      this.shadowRoot.querySelector("ht-elements-catalog-list").data = items;
      this.loading = false;
    } catch (err) {
      console.log("_setData: " + err.message);
    }
  }
}

customElements.define("ht-user-portfolio", HTUserPortfolio);
