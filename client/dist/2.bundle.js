(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./client/src/relatedItems/Carousel/Carousel.jsx":
/*!*******************************************************!*\
  !*** ./client/src/relatedItems/Carousel/Carousel.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _RelatedCard_RelatedCard_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RelatedCard/RelatedCard.jsx */ \"./client/src/relatedItems/RelatedCard/RelatedCard.jsx\");\n/* harmony import */ var _OutfitCard_OutfitCard_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../OutfitCard/OutfitCard.jsx */ \"./client/src/relatedItems/OutfitCard/OutfitCard.jsx\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/md */ \"./node_modules/react-icons/md/index.esm.js\");\n/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fi */ \"./node_modules/react-icons/fi/index.esm.js\");\n/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group */ \"./node_modules/react-transition-group/esm/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst Carousel = ({\n  products,\n  productId,\n  setProductId,\n  related,\n  overviewProduct,\n  overviewRating,\n  setOutfits\n}) => {\n  const [productWithRating, setProductWithRating] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});\n  const [currentPos, setCurrentPos] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0);\n  const [length, setLength] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0);\n  const [scrollable, setScrollable] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    right: false,\n    left: false\n  }); // set varibles to determine scrollability\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (related) {\n      setLength(products.length);\n    } else {\n      setLength(Object.keys(products).length);\n    }\n\n    setCurrentPos(0);\n  }, [products]); // combine the current overview product with its rating\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (overviewProduct && overviewRating) {\n      let combinedProd = { ...overviewProduct\n      };\n      combinedProd['rating'] = overviewRating;\n      setProductWithRating(combinedProd);\n    }\n  }, [overviewProduct, overviewRating]); // check to see if arrow buttons appear\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    let buffer = related ? 3 : 2;\n\n    if (currentPos === 0 && currentPos + buffer >= length) {\n      setScrollable({\n        left: false,\n        right: false\n      });\n    } else if (currentPos === 0 && currentPos + buffer < length) {\n      setScrollable({\n        left: false,\n        right: true\n      });\n    } else if (currentPos !== 0 && currentPos + buffer >= length) {\n      setScrollable({\n        right: false,\n        left: true\n      });\n    } else {\n      setScrollable({\n        right: true,\n        left: true\n      });\n    }\n  }, [currentPos, length]);\n\n  const nextCard = () => {\n    setCurrentPos(currentPos >= length - 1 ? length - 1 : currentPos + 1);\n  };\n\n  const prevCard = () => {\n    setCurrentPos(currentPos <= 0 ? 0 : currentPos - 1);\n  };\n\n  const getDefaultStyle = prod => {\n    prod.styles.results.forEach(style => {\n      if (style['default?'] === true) {\n        return style;\n      }\n    });\n    return prod.styles.results[0];\n  };\n\n  const getStarRating = async id => {\n    let averageRating = 0;\n    await axios__WEBPACK_IMPORTED_MODULE_6___default.a.get('/getAverageRating', {\n      params: {\n        productId: id\n      }\n    }).then(response => {\n      averageRating = response.data;\n      return;\n    }).catch(err => {\n      console.log(err);\n      return;\n    });\n    return averageRating;\n  };\n\n  const saveOutfit = () => {\n    let allOutfits = { ...products\n    };\n    allOutfits[productWithRating.overview.id] = productWithRating;\n    setOutfits(allOutfits);\n    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));\n  };\n\n  const deleteOutfit = id => {\n    let allOutfits = { ...products\n    };\n    delete allOutfits[id];\n    setOutfits(allOutfits);\n    window.localStorage.removeItem('myThreads');\n    window.localStorage.setItem('myThreads', JSON.stringify(allOutfits));\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n    className: \"carousel\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, scrollable.left ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_3__[\"MdKeyboardArrowLeft\"], {\n    className: \"left-arrow\",\n    onClick: prevCard\n  }) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"cards-container\"\n  }, length !== 0 && related && products ? products.map((product, index) => {\n    return index >= currentPos || currentPos + 2 >= length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RelatedCard_RelatedCard_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      key: product.overview.id,\n      product: product,\n      productId: productId,\n      setProductId: setProductId,\n      getStarRating: getStarRating,\n      getDefaultStyle: getDefaultStyle\n    }) : null;\n  }) : null, !related ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"empty-card\",\n    onClick: () => saveOutfit()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Add to Outfit\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__[\"FiPlusCircle\"], {\n    id: \"add-outfit-btn\"\n  })) : null, length !== 0 && !related && products ? Object.values(products).map((product, index) => {\n    return index >= currentPos || currentPos + 1 >= length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OutfitCard_OutfitCard_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      key: product.overview.id,\n      outfit: product,\n      productId: productId,\n      setProductId: setProductId,\n      getDefaultStyle: getDefaultStyle,\n      deleteOutfit: deleteOutfit\n    }) : null;\n  }) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, scrollable.right ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_3__[\"MdKeyboardArrowRight\"], {\n    className: \"right-arrow\",\n    onClick: nextCard\n  }) : null));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Carousel);\n\n//# sourceURL=webpack:///./client/src/relatedItems/Carousel/Carousel.jsx?");

/***/ }),

/***/ "./client/src/relatedItems/CompareModal/CompareModal.jsx":
/*!***************************************************************!*\
  !*** ./client/src/relatedItems/CompareModal/CompareModal.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../App.jsx */ \"./client/src/App.jsx\");\n\n\n\n\n\nconst CompareModal = ({\n  open,\n  onClose,\n  relatedProduct,\n  productId\n}) => {\n  if (!open) {\n    return null;\n  }\n\n  const [overviewProduct, setOverviewProduct] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});\n  const [comparedFeatures, setComparedFeatures] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(null);\n  const darkTheme = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_App_jsx__WEBPACK_IMPORTED_MODULE_3__[\"ThemeContext\"]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/overview', {\n      params: {\n        productId: productId\n      }\n    }).then(response => {\n      setOverviewProduct(response.data.overview);\n    }).catch(err => {\n      console.log(err);\n      return;\n    });\n  }, [productId]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    Object.keys(overviewProduct).length !== 0 ? getCompareList() : null;\n  }, [overviewProduct]);\n\n  const getCompareList = () => {\n    let featureList = {};\n    overviewProduct.features.forEach(obj => {\n      featureList[obj.feature] = [obj.value, ' '];\n    });\n    relatedProduct.overview.features.forEach(obj => {\n      if (featureList[obj.feature]) {\n        featureList[obj.feature][1] = [obj.value];\n      } else {\n        featureList[obj.feature] = [' ', obj.value];\n      }\n    });\n    setComparedFeatures(featureList);\n  };\n\n  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.createPortal( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"overlay\",\n    onClick: onClose,\n    style: {\n      backgroundColor: darkTheme ? '#333' : '#000'\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"compare-modal\",\n    style: {\n      color: darkTheme ? '#fff' : '#000',\n      backgroundColor: darkTheme ? '#000' : '#fff'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    className: \"modal-title\"\n  }, \"Comparing\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"table\", {\n    className: \"compare-table\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"thead\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n    className: \"compare-header\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n    className: \"modal-header left\"\n  }, overviewProduct.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n    className: \"modal-header center\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", {\n    className: \"modal-header right\"\n  }, relatedProduct.overview.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\", {\n    className: \"feature-list\"\n  }, comparedFeatures ? Object.keys(comparedFeatures).map((feature, index) => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", {\n      key: index,\n      className: \"compare-body\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n      className: \"modal-body left\"\n    }, comparedFeatures[feature][0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n      className: \"modal-body center\"\n    }, feature), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", {\n      className: \"modal-body right\"\n    }, comparedFeatures[feature][1]));\n  }) : null)))), document.getElementById('portal'));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CompareModal);\n\n//# sourceURL=webpack:///./client/src/relatedItems/CompareModal/CompareModal.jsx?");

/***/ }),

/***/ "./client/src/relatedItems/OutfitCard/OutfitCard.jsx":
/*!***********************************************************!*\
  !*** ./client/src/relatedItems/OutfitCard/OutfitCard.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var stars_rating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stars-rating */ \"./node_modules/stars-rating/dist/stars-rating.js\");\n/* harmony import */ var stars_rating__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stars_rating__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/io */ \"./node_modules/react-icons/io/index.esm.js\");\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../App.jsx */ \"./client/src/App.jsx\");\n\n\n\n\n\nconst OutfitCard = ({\n  outfit,\n  productId,\n  setProductId,\n  getDefaultStyle,\n  deleteOutfit\n}) => {\n  const [defaultStyle, setDefaultStyle] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});\n  const imageURL = outfit.styles.results[0].photos[0].thumbnail_url;\n  const darkTheme = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_App_jsx__WEBPACK_IMPORTED_MODULE_3__[\"ThemeContext\"]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    (async () => {\n      let style = await getDefaultStyle(outfit);\n      setDefaultStyle(style);\n    })();\n  }, [outfit]);\n\n  const handleOutfitCardClick = async () => {\n    await setProductId(outfit.overview.id);\n    document.getElementById('header').scrollIntoView();\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_io__WEBPACK_IMPORTED_MODULE_2__[\"IoMdCloseCircleOutline\"], {\n    className: \"action-btn\",\n    style: {\n      color: darkTheme ? '#fff' : '#000',\n      backgroundColor: darkTheme ? '#000' : '#fff'\n    },\n    onClick: () => deleteOutfit(outfit.overview.id)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-inner-container\",\n    onClick: () => handleOutfitCardClick()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"card-image\",\n    alt: \"outfit-card\",\n    src: imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text category\"\n  }, outfit.overview.category.toUpperCase()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text name\"\n  }, outfit.overview.name), defaultStyle.sale_price ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text price\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    style: {\n      color: 'red'\n    }\n  }, \"$\", defaultStyle.sale_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    style: {\n      textDecoration: 'line-through'\n    }\n  }, \"$\", defaultStyle.original_price)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text\"\n  }, \"$\", defaultStyle.original_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text rating\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(stars_rating__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    count: 5,\n    value: outfit.rating,\n    half: true,\n    edit: false\n  })))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (OutfitCard);\n\n//# sourceURL=webpack:///./client/src/relatedItems/OutfitCard/OutfitCard.jsx?");

/***/ }),

/***/ "./client/src/relatedItems/RelatedCard/RelatedCard.jsx":
/*!*************************************************************!*\
  !*** ./client/src/relatedItems/RelatedCard/RelatedCard.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _CompareModal_CompareModal_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CompareModal/CompareModal.jsx */ \"./client/src/relatedItems/CompareModal/CompareModal.jsx\");\n/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/md */ \"./node_modules/react-icons/md/index.esm.js\");\n/* harmony import */ var stars_rating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! stars-rating */ \"./node_modules/stars-rating/dist/stars-rating.js\");\n/* harmony import */ var stars_rating__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stars_rating__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../App.jsx */ \"./client/src/App.jsx\");\n\n\n\n\n\n\nconst RelatedCard = ({\n  product,\n  productId,\n  setProductId,\n  getStarRating,\n  getDefaultStyle\n}) => {\n  const [defaultStyle, setDefaultStyle] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({});\n  const [averageRating, setAverageRating] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(0);\n  const [modalOpen, setModalOpen] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const imageURL = product.styles.results[0].photos[0].thumbnail_url;\n  const darkTheme = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(_App_jsx__WEBPACK_IMPORTED_MODULE_4__[\"ThemeContext\"]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    (async () => {\n      let style = await getDefaultStyle(product);\n      setDefaultStyle(style);\n      let starRating = await getStarRating(product.overview.id);\n      setAverageRating(starRating);\n    })();\n  }, [product]);\n\n  const handleRelatedCardClick = async () => {\n    await setProductId(product.overview.id);\n    document.getElementById('header').scrollIntoView();\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_md__WEBPACK_IMPORTED_MODULE_2__[\"MdStarBorder\"], {\n    className: \"action-btn\",\n    style: {\n      color: darkTheme ? '#fff' : '#000',\n      backgroundColor: darkTheme ? '#000' : '#fff'\n    },\n    onClick: () => setModalOpen(true)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CompareModal_CompareModal_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    open: modalOpen,\n    productId: productId,\n    relatedProduct: product,\n    onClose: () => setModalOpen(false)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-inner-container\",\n    onClick: () => handleRelatedCardClick()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    className: \"card-image\",\n    alt: \"related-card\",\n    src: imageURL !== null ? imageURL : 'https://bit.ly/2Tg8g4s'\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text category\"\n  }, product.overview.category.toUpperCase()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text name\"\n  }, product.overview.name), defaultStyle.sale_price ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text price\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    style: {\n      color: 'red'\n    }\n  }, \"$\", defaultStyle.sale_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    style: {\n      textDecoration: 'line-through'\n    }\n  }, \"$\", defaultStyle.original_price)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text\"\n  }, \"$\", defaultStyle.original_price), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"card-item text rating\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(stars_rating__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    count: 5,\n    value: averageRating,\n    half: true,\n    edit: false\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RelatedCard);\n\n//# sourceURL=webpack:///./client/src/relatedItems/RelatedCard/RelatedCard.jsx?");

/***/ }),

/***/ "./client/src/relatedItems/RelatedEntry/RelatedEntry.jsx":
/*!***************************************************************!*\
  !*** ./client/src/relatedItems/RelatedEntry/RelatedEntry.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Carousel_Carousel_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Carousel/Carousel.jsx */ \"./client/src/relatedItems/Carousel/Carousel.jsx\");\n/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group */ \"./node_modules/react-transition-group/esm/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst RelatedItemsAndComparison = ({\n  productId,\n  setProductId,\n  overviewProduct,\n  overviewRating\n}) => {\n  const [relatedProducts, setRelatedProducts] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [outfits, setOutfits] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  const [animate, setAnimate] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false);\n  const [relatedIds, setRelatedIds] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([13024, 13025, 13030, 13029]);\n  const [initialLoadDone, setInitialLoadDone] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false); // get saved outfits on inital render\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    const savedOutfits = JSON.parse(window.localStorage.getItem('myThreads'));\n    savedOutfits ? setOutfits(savedOutfits) : null;\n  }, [productId]); // get related products when the productId changes\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (initialLoadDone) {\n      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/relatedIds', {\n        params: {\n          productId: productId\n        }\n      }).then(response => {\n        setRelatedIds(response.data);\n      }).catch(err => {\n        console.log(err);\n        return;\n      });\n    } else {\n      setInitialLoadDone(true);\n    }\n  }, [productId]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    if (relatedIds.length !== 0) {\n      (async () => {\n        let allRelatedProducts = await getRelatedProductsMemo;\n        setRelatedProducts(allRelatedProducts);\n        setAnimate(true);\n      })();\n    }\n  }, [relatedIds]); // gets related products for each id\n\n  const getRelatedProducts = async ids => {\n    try {\n      let items = await ids.map(id => {\n        return getRelatedProductById(id);\n      });\n      let relatedItems = await Promise.all(items);\n      return relatedItems;\n    } catch (err) {\n      console.log(err);\n    }\n  }; // fetches a related product from the server\n\n\n  const getRelatedProductById = async id => {\n    let relatedProduct = {};\n    await axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/relatedProduct', {\n      params: {\n        productId: id\n      }\n    }).then(response => {\n      relatedProduct = response.data;\n    }).catch(err => {\n      console.log(err);\n      return;\n    });\n    return relatedProduct;\n  };\n\n  const getRelatedProductsMemo = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useMemo\"])(() => {\n    return getRelatedProducts(relatedIds);\n  }, [relatedIds]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    className: \"section-header\"\n  }, \"RELATED PRODUCTS\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__[\"CSSTransition\"], {\n    in: animate,\n    appear: true,\n    timeout: 1000,\n    classNames: \"fade\",\n    unmountOnExit: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Carousel_Carousel_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    related: true,\n    products: relatedProducts,\n    productId: productId,\n    setProductId: setProductId,\n    overviewProduct: overviewProduct,\n    overviewRating: overviewRating\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    className: \"section-header\"\n  }, \"YOUR OUTFIT\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_2__[\"CSSTransition\"], {\n    in: animate,\n    appear: true,\n    timeout: 1000,\n    classNames: \"fade\",\n    unmountOnExit: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Carousel_Carousel_jsx__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    related: false,\n    products: outfits,\n    productId: productId,\n    setProductId: setProductId,\n    setOutfits: setOutfits,\n    overviewProduct: overviewProduct,\n    overviewRating: overviewRating\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RelatedItemsAndComparison);\n\n//# sourceURL=webpack:///./client/src/relatedItems/RelatedEntry/RelatedEntry.jsx?");

/***/ })

}]);