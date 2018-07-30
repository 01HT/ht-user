"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@01ht/ht-elements-catalog/ht-elements-catalog-list.js";
import "@01ht/ht-spinner";

class HTUserPortfolio extends LitElement {
  _render({ loading, cartChangeInProcess }) {
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
        <ht-spinner hidden?=${!loading} page></ht-spinner>
        <ht-elements-catalog-list view="grid" hidden?=${loading} cartChangeInProcess=${cartChangeInProcess}></ht-elements-catalog-list>
    </div>`;
  }

  static get is() {
    return "ht-user-portfolio";
  }

  static get properties() {
    return {
      data: Object,
      loading: Boolean,
      cartChangeInProcess: Boolean
    };
  }

  constructor() {
    super();
    this.loading = true;
  }

  _shouldRender(props, changedProps, prevProps) {
    if (changedProps.data) this._setData(changedProps.data);
    return true;
  }

  async _setData(data) {
    try {
      this.loading = true;
      let items = [];
      const snapshot = await firebase
        .firestore()
        .collection("items")
        .where("authorId", "==", data.uid)
        // .orderBy("created", "desc")
        .get();
      snapshot.forEach(doc => {
        const data = doc.data();
        data.itemId = doc.id;
        items.push(data);
      });
      this.shadowRoot.querySelector("ht-elements-catalog-list").data = items;
      this.loading = false;
    } catch (err) {
      console.log("_setData: " + err.message);
    }
  }
}

customElements.define(HTUserPortfolio.is, HTUserPortfolio);
