"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/paper-tooltip";

import "@01ht/ht-user-avatar";
import "@01ht/ht-spinner";

import "./ht-user-about";
import "./ht-user-portfolio";

import {
  updateMetadata,
  getMetaDescriptionFromQuillObject
} from "@01ht/ht-client-helper-functions/metadata.js";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTUser extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        a {
          outline: none;
        }

        ht-user-about {
          margin-top: 16px;
        }

        iron-icon {
          color: var(--secondary-text-color);
          min-width: 22px;
          min-height: 22px;
        }

        #container[loading] {
          display: flex;
          flex-direction: column;
        }

        #container {
          display: grid;
          grid-template-columns: 0.25fr 0.75fr;
          width: 100%;
          margin-top: 32px;
          grid-gap: 32px;
        }

        #main,
        #sidebar {
          display: flex;
          flex-direction: column;
        }

        #sidebar {
          overflow: hidden;
        }

        #sidebar h1,
        #sidebar #displayName,
        #sidebar #fullname,
        .text {
          word-wrap: break-word;
          overflow: hidden;
          width: 100%;
        }

        #displayName {
          font-size: 24px;
          color: #2d2d2d;
          line-height: 1.42;
          font-weight: 500;
          margin: 0;
          padding: 0;
          margin-top: 16px;
        }

        #fullname {
          font-size: 16px;
          color: var(--secondary-text-color);
        }

        #social {
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        #social a {
          margin-right: 8px;
        }

        #info {
          margin-top: 32px;
          width: 100%;
        }

        .info {
          display: flex;
          align-items: center;
          color: var(--secondary-text-color);
          margin-bottom: 8px;
          position: relative;
        }

        .icon-block {
          position: relative;
          display: flex;
          align-items: center;
        }

        .info iron-icon {
          margin-right: 8px;
          color: var(--secondary-text-color);
          min-width: 18px;
          min-height: 18px;
          width: 18px;
          height: 18px;
        }

        #sales {
          margin-top: 16px;
        }

        #nav {
          display: flex;
          margin-bottom: 16px;
        }

        .menu {
          text-decoration: none;
          color: #414549;
          font-weight: 500;
          font-size: 14px;
          text-transform: uppercase;
          padding: 16px;
          margin: 0 9px;
        }

        .menu:hover {
          border-bottom: 4px solid #dfe1e5;
        }

        .menu[active],
        .menu[active]:hover {
          border-bottom: 4px solid var(--accent-color);
        }

        #main > .page {
          display: none;
        }

        #main > .page[active] {
          display: block;
        }

        @media (max-width: 650px) {
          #container {
            grid-template-columns: auto;
          }

          #sidebar {
            align-items: center;
          }

          #nav {
            justify-content: center;
          }
        }

        #social[hidden],
        #info[hidden],
        #main[hidden],
        #sidebar[hidden],
        ht-spinner[hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { userData, loading, page, cartChangeInProcess, userNumber } = this;
    if (userData === undefined) {
      return html`<ht-spinner page></ht-spinner>`;
    }
    return html`
    <iron-iconset-svg size="24" name="ht-user-icons">
        <svg>
            <defs>
              <g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
              <g id="location-city"><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></g>
              <g id="email"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
              <g id="phone"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></g>
              <g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
              <g id="business"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></g>
              <g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
              <g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
            </defs>
        </svg>
    </iron-iconset-svg>
    <div id="container" ?loading="${loading}">
      <ht-spinner ?hidden="${!loading}" page></ht-spinner>
      <div id="sidebar" ?hidden="${loading}">
        <ht-user-avatar .data="${userData}" .size="${128}" .verifiedSize="${28}"></ht-user-avatar>
        <h1 id="displayName">${userData.displayName}</h1>
        <div id="fullname" ?hidden="${userData.firstName === "" &&
          userData.lastName === ""}">${userData.firstName} ${
      userData.lastName
    }</div>
        <div id="social" ?hidden="${userData.website === "" &&
          userData.google === "" &&
          userData.facebook === "" &&
          userData.twitter === "" &&
          userData.github === ""}">
          ${
            userData.website !== ""
              ? html`<a href="${
                  userData.website
                }" target="_blank" rel="noopener nofollow">
            <iron-icon src="${
              window.appConfig.cloudinary.url
            }/image/upload/v1532588175/logos/website/website-color.svg"></iron-icon>
            <paper-tooltip position="right" animation-delay="0" offset="4">Сайт пользователя</paper-tooltip>
          </a>`
              : ""
          }
          ${
            userData.twitter !== ""
              ? html`<a href="${
                  userData.twitter
                }" target="_blank" rel="noopener nofollow">
            <iron-icon  src="${
              window.appConfig.cloudinary.url
            }/image/upload/v1532587138/logos/twitter/twitter-color.svg"></iron-icon>
            <paper-tooltip position="right" animation-delay="0" offset="4">Профайл Twitter</paper-tooltip>
          </a>`
              : ""
          }
          ${
            userData.facebook !== ""
              ? html`<a href="${
                  userData.facebook
                }" target="_blank" rel="noopener nofollow">
            <iron-icon  src="${
              window.appConfig.cloudinary.url
            }/image/upload/v1532586978/logos/facebook/logo-color.svg"></iron-icon>
            <paper-tooltip position="right" animation-delay="0" offset="4">Профайл Facebook</paper-tooltip>
          </a>`
              : ""
          }
           ${
             userData.google !== ""
               ? html`<a href="${
                   userData.google
                 }" target="_blank" rel="noopener nofollow">
            <iron-icon  src="${
              window.appConfig.cloudinary.url
            }/image/upload/v1532600717/logos/google/google-plus.svg"></iron-icon>
            <paper-tooltip position="right" animation-delay="0" offset="4">Профайл Google+</paper-tooltip>
          </a>`
               : ""
           }
          ${
            userData.github !== ""
              ? html`<a href="${
                  userData.github
                }" target="_blank" rel="noopener nofollow">
            <iron-icon  src="${
              window.appConfig.cloudinary.url
            }/image/upload/v1532587414/logos/github/github-color.svg"></iron-icon>
            <paper-tooltip position="right" animation-delay="0" offset="4">Профайл GitHub</paper-tooltip>
          </a>`
              : ""
          }
        </div>
        <div id="info" ?hidden="${userData.email === "" &&
          userData.phone === "" &&
          userData.country === "" &&
          userData.city === "" &&
          userData.company === "" &&
          userData.position === ""}">
          ${
            userData.email !== ""
              ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-icons:email"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">Email</paper-tooltip>
            </div>
            <div class="text">${userData.email}</div>
            </div>`
              : ""
          }
          ${
            userData.phone !== ""
              ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-icons:phone"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">Телефон</paper-tooltip>
            </div>
            <div class="text">${userData.phone}</div>
            </div>`
              : ""
          }
          ${
            userData.country !== ""
              ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-icons:flag"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">Страна</paper-tooltip>
            </div>
            <div class="text">${userData.country}</div>
            </div>`
              : ""
          }
          ${
            userData.city !== ""
              ? html`<div class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-icons:location-city"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">Город</paper-tooltip>
            </div>
            <div class="text">${userData.city}</div>
            </div>`
              : ""
          }
          ${
            userData.company !== ""
              ? html`<div class="info">
             <div class="icon-block">
                <iron-icon icon="ht-user-icons:business"></iron-icon>
                <paper-tooltip position="right" animation-delay="0" offset="4">Место работы</paper-tooltip> </div>
              <div class="text">${userData.company}</div>
            </div>`
              : ""
          }
          ${
            userData.position !== ""
              ? html`<div class="info">
              <div class="icon-block">
                <iron-icon icon="ht-user-icons:assignment-ind"></iron-icon>
                <paper-tooltip position="right" animation-delay="0" offset="4">Должность</paper-tooltip>
              </div>
              <div class="text">${userData.position}</div>
            </div>`
              : ""
          }
          ${
            userData.isAuthor && userData.sales > 0
              ? html`<div id="sales" class="info">
            <div class="icon-block">
              <iron-icon icon="ht-user-icons:shopping-cart"></iron-icon>
              <paper-tooltip position="right" animation-delay="0" offset="4">Продажи</paper-tooltip>
            </div>
            <div class="text">${userData.sales}</div>
            </div>`
              : ""
          }
        </div>
      </div>
      <div id="main" ?hidden="${loading}">
        <div id="nav">
          <a href="/user/${
            userData.nameInURL
          }/${userNumber}/about" class="menu" ?active="${page ===
      "about"}">О себе</a>
          <a href="/user/${
            userData.nameInURL
          }/${userNumber}/portfolio" class="menu" ?active="${page ===
      "portfolio"}" ?hidden="${!userData.isAuthor}">Портфолио</a>
        </div>
        <ht-user-about class="page" ?active="${page ===
          "about"}" .data="${userData}"></ht-user-about>
        <ht-user-portfolio class="page" ?active="${page ===
          "portfolio"}" .data="${userData}" .cartChangeInProcess="${cartChangeInProcess}"></ht-user-portfolio>
      </div>
    </div>`;
  }

  static get properties() {
    return {
      userData: { type: Object },
      loading: { type: Boolean },
      page: { type: String },
      userNumber: { type: Number },
      cartChangeInProcess: { type: Boolean }
    };
  }

  updated() {
    if (this.userData === undefined) return;
    let description = "";
    if (this.page === "about") {
      try {
        description = getMetaDescriptionFromQuillObject(
          JSON.parse(this.userData.description)
        );
      } catch (err) {
        description = "";
      }
    }
    let meta = {
      title:
        this.page === "about"
          ? `${this.userData.displayName} | Профайл на Elements`
          : `${this.userData.displayName} - Портфолио | Elements`,
      image: `${window.appConfig.cloudinary.url}/c_scale,f_auto,h_512,w_512/v${
        this.userData.avatar.version
      }/${this.userData.avatar.public_id}.png`,
      imageAlt: `${this.userData.displayName}`,
      canonical: `${
        this.page === "about"
          ? `https://elements.01.ht/user/${this.userData.nameInURL}/${
              this.userData.userNumber
            }`
          : `https://elements.01.ht/user/${this.userData.nameInURL}/${
              this.userData.userNumber
            }/portfolio`
      }`,
      description: description
    };
    if (description === "") meta.noindex = "noindex,nofollow";
    updateMetadata(meta);
  }

  async updateData(userNumber, page) {
    try {
      this.page = page;
      if (this.userNumber === userNumber) return;
      this.userNumber = userNumber;
      this.loading = true;
      let snapshot = await window.firebase
        .firestore()
        .collection("usersPublic")
        .where("userNumber", "==", +userNumber)
        .limit(1)
        .get();
      this.loading = false;
      if (snapshot.empty) {
        this.dispatchEvent(
          new CustomEvent("page-not-found", {
            bubbles: true,
            composed: true
          })
        );
        return;
      }

      let userData;
      snapshot.forEach(doc => {
        userData = doc.data();
      });

      this.loading = false;
      if (userData.error) {
        this.dispatchEvent(
          new CustomEvent("page-not-found", {
            bubbles: true,
            composed: true
          })
        );
        return;
      }
      this.userData = userData;
    } catch (error) {
      console.log("update: " + error.message);
    }
  }
}

customElements.define("ht-user", HTUser);
