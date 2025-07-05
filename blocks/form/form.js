import { createOptimizedPicture } from '../../scripts/aem.js';
import transferRepeatableDOM, { insertAddButton, insertRemoveButton } from './components/repeat/repeat.js';
import { emailPattern, getSubmitBaseUrl, SUBMISSION_SERVICE } from './constant.js';
import GoogleReCaptcha from './integrations/recaptcha.js';
import componentDecorator from './mappings.js';
import { handleSubmit } from './submit.js';
import DocBasedFormToAF from './transform.js';
import {
  checkValidation,
  createButton,
  createDropdownUsingEnum,
  createFieldWrapper,
  createHelpText,
  createLabel,
  createRadioOrCheckboxUsingEnum,
  extractIdFromUrl,
  getHTMLRenderType,
  getSitePageName,
  setConstraints,
  setPlaceholder,
  stripTags,
  createRadioOrCheckbox,
  createInput,
} from './util.js';

const defaultPageTemplate = {
    "pageTemplate": {
        "template": {
            "id": "template",
            "name": "template",
            ":items": {
                "panel": {
                    "id": "panel-06afc6698f",
                    "fieldType": "panel",
                    "name": "form1",
                    "visible": true,
                    "label": {
                        "value": ""
                    },
                    "events": {
                        "custom:setProperty": [
                            "$event.payload"
                        ]
                    },
                    "properties": {
                        "fd:dor": {
                            "dorExclusion": false,
                            "dorExcludeTitle": false,
                            "dorExcludeDescription": false,
                            "dorContainer": {
                                "type": "subform",
                                "name": "form1",
                                "locale": "en_US",
                                "layout": "tb",
                                ":type": "core/fd/components/print/paneldorcontainer/v1/paneldorcontainer"
                            }
                        },
                        "fd:path": "/content/forms/af/mahor/testic/print/jcr:content/guideContainer/fd:pageTemplate/template/panel"
                    },
                    ":itemsOrder": [
                        "pageset_mcltwdb4p5qu0klat6"
                    ],
                    ":type": "core/fd/components/form/panel/v1/panel",
                    ":items": {
                        "pageset_mcltwdb4p5qu0klat6": {
                            "fieldType": "pageset",
                            "properties": {
                                "fd:path": "/content/forms/af/mahor/testic/print/jcr:content/guideContainer/fd:pageTemplate/template/panel/pageset_mcltwdb4p5qu0klat6",
                                "fd:dor": {
                                    "dorContainer": {
                                        ":type": "core/fd/components/print/pagesetdorcontainer/v1/pagesetdorcontainer",
                                        "type": "pageset"
                                    }
                                }
                            },
                            "id": "pageset_mcltwdb4p5qu0klat6",
                            "name": "Master Pages",
                            ":type": "core/fd/components/print/pageset/v1/pageset",
                            ":itemsOrder": [
                                "pagearea-2cc60c2cd3"
                            ],
                            ":items": {
                                "pagearea-2cc60c2cd3": {
                                    "fieldType": "pagearea",
                                    "properties": {
                                        "fd:dor": {
                                            "dorContainer": {
                                                "type": "pagearea",
                                                "name": "Page1",
                                                "id": "Page1",
                                                ":type": "core/fd/components/print/pageareadorcontainer/v1/pageareadorcontainer"
                                            }
                                        },
                                        "fd:path": "/content/forms/af/mahor/testic/print/jcr:content/guideContainer/fd:pageTemplate/template/panel/pageset_mcltwdb4p5qu0klat6/pagearea-2cc60c2cd3"
                                    },
                                    "name": "Page1",
                                    "id": "pagearea-2cc60c2cd3",
                                    ":type": "core/fd/components/print/pagearea/v1/pagearea",
                                    ":items": {
                                        "medium": {
                                            "fieldType": "medium",
                                            "name": "medium",
                                            "properties": {
                                                "fd:dor": {
                                                    "dorContainer": {
                                                        "type": "medium",
                                                        "stock": "default",
                                                        "short": "215.9mm",
                                                        "long": "279.4mm",
                                                        ":type": "core/fd/components/print/mediumdorcontainer/v1/mediumdorcontainer"
                                                    }
                                                }
                                            },
                                            ":type": "core/fd/components/print/medium/v1/medium"
                                        },
                                        "contentarea_mcltwdb7y8w8c5zt94d": {
                                            "fieldType": "contentarea",
                                            "name": "untitled contentarea",
                                            "properties": {
                                                "fd:path": "/content/forms/af/mahor/testic/print/jcr:content/guideContainer/fd:pageTemplate/template/contentarea_mcltwdb7y8w8c5zt94d",
                                                "fd:dor": {
                                                    "dorContainer": {
                                                        "type": "contentarea",
                                                        "width": "203.2mm",
                                                        "height": "266.7mm",
                                                        "left": "6.35mm",
                                                        "top": "6.35mm",
                                                        ":type": "core/fd/components/print/contentareadorcontainer/v1/contentareadorcontainer"
                                                    }
                                                }
                                            },
                                            ":type": "core/fd/components/print/contentarea/v1/contentarea"
                                        }
                                    },
                                    ":itemsOrder": [
                                        "medium",
                                        "contentarea_mcltwdb7y8w8c5zt94d"
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            ":itemsOrder": [
                "panel"
            ],
            ":type": "core/fd/components/print/template/v1/template"
        },
        "config": "<config xmlns=\"http://www.xfa.org/schema/xci/3.0/\">\n   <agent name=\"designer\">\n      <!--  [0..n]  -->\n      <destination>pdf</destination>\n      <pdf>\n         <!--  [0..n]  -->\n         <fontInfo></fontInfo>\n      </pdf>\n   </agent>\n   <present>\n      <!--  [0..n]  -->\n      <pdf>\n         <!--  [0..n]  -->\n         <fontInfo>\n            <embed>0</embed>\n         </fontInfo>\n         <tagged>0</tagged>\n         <version>1.7</version>\n         <adobeExtensionLevel>11</adobeExtensionLevel>\n      </pdf>\n      <xdp>\n         <packets>*</packets>\n      </xdp>\n   </present>\n</config>",
        "localeSet": "<localeSet xmlns=\"http://www.xfa.org/schema/xfa-locale-set/2.7/\">\n   <locale name=\"en_US\" desc=\"English (United States)\">\n      <calendarSymbols name=\"gregorian\">\n         <monthNames>\n            <month>January</month>\n            <month>February</month>\n            <month>March</month>\n            <month>April</month>\n            <month>May</month>\n            <month>June</month>\n            <month>July</month>\n            <month>August</month>\n            <month>September</month>\n            <month>October</month>\n            <month>November</month>\n            <month>December</month>\n         </monthNames>\n         <monthNames abbr=\"1\">\n            <month>Jan</month>\n            <month>Feb</month>\n            <month>Mar</month>\n            <month>Apr</month>\n            <month>May</month>\n            <month>Jun</month>\n            <month>Jul</month>\n            <month>Aug</month>\n            <month>Sep</month>\n            <month>Oct</month>\n            <month>Nov</month>\n            <month>Dec</month>\n         </monthNames>\n         <dayNames>\n            <day>Sunday</day>\n            <day>Monday</day>\n            <day>Tuesday</day>\n            <day>Wednesday</day>\n            <day>Thursday</day>\n            <day>Friday</day>\n            <day>Saturday</day>\n         </dayNames>\n         <dayNames abbr=\"1\">\n            <day>Sun</day>\n            <day>Mon</day>\n            <day>Tue</day>\n            <day>Wed</day>\n            <day>Thu</day>\n            <day>Fri</day>\n            <day>Sat</day>\n         </dayNames>\n         <meridiemNames>\n            <meridiem>AM</meridiem>\n            <meridiem>PM</meridiem>\n         </meridiemNames>\n         <eraNames>\n            <era>BC</era>\n            <era>AD</era>\n         </eraNames>\n      </calendarSymbols>\n      <datePatterns>\n         <datePattern name=\"full\">EEEE, MMMM D, YYYY</datePattern>\n         <datePattern name=\"long\">MMMM D, YYYY</datePattern>\n         <datePattern name=\"med\">MMM D, YYYY</datePattern>\n         <datePattern name=\"short\">M/D/YY</datePattern>\n      </datePatterns>\n      <timePatterns>\n         <timePattern name=\"full\">h:MM:SS A Z</timePattern>\n         <timePattern name=\"long\">h:MM:SS A Z</timePattern>\n         <timePattern name=\"med\">h:MM:SS A</timePattern>\n         <timePattern name=\"short\">h:MM A</timePattern>\n      </timePatterns>\n      <dateTimeSymbols>GyMdkHmsSEDFwWahKzZ</dateTimeSymbols>\n      <numberPatterns>\n         <numberPattern name=\"numeric\">z,zz9.zzz</numberPattern>\n         <numberPattern name=\"currency\">$z,zz9.99|($z,zz9.99)</numberPattern>\n         <numberPattern name=\"percent\">z,zz9%</numberPattern>\n      </numberPatterns>\n      <numberSymbols>\n         <numberSymbol name=\"decimal\">.</numberSymbol>\n         <numberSymbol name=\"grouping\">,</numberSymbol>\n         <numberSymbol name=\"percent\">%</numberSymbol>\n         <numberSymbol name=\"minus\">-</numberSymbol>\n         <numberSymbol name=\"zero\">0</numberSymbol>\n      </numberSymbols>\n      <currencySymbols>\n         <currencySymbol name=\"symbol\">$</currencySymbol>\n         <currencySymbol name=\"isoname\">USD</currencySymbol>\n         <currencySymbol name=\"decimal\">.</currencySymbol>\n      </currencySymbols>\n      <typefaces>\n         <typeface name=\"Myriad Pro\"></typeface>\n         <typeface name=\"Minion Pro\"></typeface>\n         <typeface name=\"Courier Std\"></typeface>\n         <typeface name=\"Adobe Pi Std\"></typeface>\n         <typeface name=\"Adobe Hebrew\"></typeface>\n         <typeface name=\"Adobe Arabic\"></typeface>\n         <typeface name=\"Adobe Thai\"></typeface>\n         <typeface name=\"Kozuka Gothic Pro-VI M\"></typeface>\n         <typeface name=\"Kozuka Mincho Pro-VI R\"></typeface>\n         <typeface name=\"Adobe Ming Std L\"></typeface>\n         <typeface name=\"Adobe Song Std L\"></typeface>\n         <typeface name=\"Adobe Myungjo Std M\"></typeface>\n         <typeface name=\"Adobe Devanagari\"></typeface>\n      </typefaces>\n   </locale>\n</localeSet>",
        "xmpMetaData": "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 9.0-c000 79.cca54b0, 2022/11/26-09:29:55        \">\n   <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">\n      <rdf:Description xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:pdfuaid=\"http://www.aiim.org/pdfua/ns/id/\" xmlns:pdf=\"http://ns.adobe.com/pdf/1.3/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:desc=\"http://ns.adobe.com/xfa/promoted-desc/\" rdf:about=\"\">\n         <xmp:MetadataDate>2024-05-20T09:32:29Z</xmp:MetadataDate>\n         <xmp:CreatorTool>Designer 2023.07</xmp:CreatorTool>\n         <pdfuaid:part>1</pdfuaid:part>\n         <pdf:Producer>Designer 2023.07</pdf:Producer>\n         <xmpMM:DocumentID>uuid:36f0018a-338d-4185-9f48-13eb5d7236fb</xmpMM:DocumentID>\n         <desc:version rdf:parseType=\"Resource\">\n            <rdf:value>2023.07.17.1.</rdf:value>\n            <desc:ref>/template/subform[1]</desc:ref>\n         </desc:version>\n      </rdf:Description>\n   </rdf:RDF>\n</x:xmpmeta>",
        ":type": "core/fd/components/print/pagetemplate/v1/pagetemplate",
        "id": "pagetemplate",
        "name": "pagetemplate"
    }
}

const datefield = {
  "type": "datetimefield",
  "attribute": {
    "name": "DateField",
    "height": "8.9992mm",
    "width": "61.9986mm"
  },
  "caption": {
    "para": {
      "vAlign": "middle"
    },
    "reserve": "25.0012mm",
    "value": {
      "text": {
        "content": "Date Field"
      }
    },
    "placement": "left"
  },
  "value": {
    "date": {
      "content": ""
    }
  },
  "ui": {
    "dateTimeEdit": {}
  },
  "margin": {
    "topInset": "1mm",
    "leftInset": "1mm",
    "bottomInset": "1mm",
    "rightInset": "1mm"
  },
  "para": {
    "vAlign": "middle"
  }
}


export const DELAY_MS = 0;
let captchaField;
let afModule;

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const input = document.createElement('textarea');
  setPlaceholder(input, fd);
  return input;
});

const createSelect = withFieldWrapper((fd) => {
  const select = document.createElement('select');
  createDropdownUsingEnum(fd, select);
  return select;
});

function createHeading(fd) {
  const wrapper = createFieldWrapper(fd);
  const heading = document.createElement('h2');
  heading.textContent = fd.value || fd.label.value;
  heading.id = fd.id;
  wrapper.append(heading);

  return wrapper;
}

function createLegend(fd) {
  return createLabel(fd, 'legend');
}

function createRepeatablePanel(wrapper, fd) {
  setConstraints(wrapper, fd);
  wrapper.dataset.repeatable = true;
  wrapper.dataset.index = fd.index || 0;
  if (fd.properties) {
    Object.keys(fd.properties).forEach((key) => {
      if (!key.startsWith('fd:')) {
        wrapper.dataset[key] = fd.properties[key];
      }
    });
  }
  if ((!fd.index || fd?.index === 0) && fd.properties?.variant !== 'noButtons') {
    insertAddButton(wrapper, wrapper);
    insertRemoveButton(wrapper, wrapper);
  }
}

function createFieldSet(fd) {
  const wrapper = createFieldWrapper(fd, 'fieldset', createLegend);
  wrapper.id = fd.id;
  wrapper.name = fd.name;
  if (fd.fieldType === 'panel') {
    wrapper.classList.add('panel-wrapper');
  }
  if (fd.repeatable === true) {
    createRepeatablePanel(wrapper, fd);
  }
  return wrapper;
}

function setConstraintsMessage(field, messages = {}) {
  Object.keys(messages).forEach((key) => {
    field.dataset[`${key}ErrorMessage`] = messages[key];
  });
}

function createRadioOrCheckboxGroup(fd) {
  const wrapper = createFieldSet({ ...fd });
  createRadioOrCheckboxUsingEnum(fd, wrapper);
  wrapper.dataset.required = fd.required;
  if (fd.tooltip) {
    wrapper.title = stripTags(fd.tooltip, '');
  }
  setConstraintsMessage(wrapper, fd.constraintMessages);
  return wrapper;
}

function createPlainText(fd) {
  const paragraph = document.createElement('p');
  if (fd.richText) {
    paragraph.innerHTML = stripTags(fd.value);
  } else {
    paragraph.textContent = fd.value;
  }
  const wrapper = createFieldWrapper(fd);
  wrapper.id = fd.id;
  wrapper.replaceChildren(paragraph);
  return wrapper;
}

function createImage(fd) {
  const field = createFieldWrapper(fd);
  field.id = fd?.id;
  const imagePath = fd.value || fd.properties['fd:repoPath'] || '';
  const altText = fd.altText || fd.name;
  field.append(createOptimizedPicture(imagePath, altText));
  return field;
}

const fieldRenderers = {
  'drop-down': createSelect,
  'plain-text': createPlainText,
  checkbox: createRadioOrCheckbox,
  button: createButton,
  multiline: createTextArea,
  panel: createFieldSet,
  radio: createRadioOrCheckbox,
  'radio-group': createRadioOrCheckboxGroup,
  'checkbox-group': createRadioOrCheckboxGroup,
  image: createImage,
  heading: createHeading,
};

function colSpanDecorator(field, element) {
  const colSpan = field['Column Span'] || field.properties?.colspan;
  if (colSpan && element) {
    element.classList.add(`col-${colSpan}`);
  }
}

const handleFocus = (input, field) => {
  const editValue = input.getAttribute('edit-value');
  input.type = field.type;
  input.value = editValue;
};

const handleFocusOut = (input) => {
  const displayValue = input.getAttribute('display-value');
  input.type = 'text';
  input.value = displayValue;
};

function inputDecorator(field, element) {
  const input = element?.querySelector('input,textarea,select');
  if (input) {
    input.id = field.id;
    input.name = field.name;
    if (field.tooltip) {
      input.title = stripTags(field.tooltip, '');
    }
    input.readOnly = field.readOnly;
    input.autocomplete = field.autoComplete ?? 'off';
    input.disabled = field.enabled === false;
    if (field.fieldType === 'drop-down' && field.readOnly) {
      input.disabled = true;
    }
    const fieldType = getHTMLRenderType(field);
    if (['number', 'date', 'text', 'email'].includes(fieldType) && (field.displayFormat || field.displayValueExpression)) {
      field.type = fieldType;
      input.setAttribute('edit-value', field.value ?? '');
      input.setAttribute('display-value', field.displayValue ?? '');
      input.type = 'text';
      input.value = field.displayValue ?? '';
      input.addEventListener('touchstart', () => { input.type = field.type; }); // in mobile devices the input type needs to be toggled before focus
      input.addEventListener('focus', () => handleFocus(input, field));
      input.addEventListener('blur', () => handleFocusOut(input));
    } else if (input.type !== 'file') {
      input.value = field.value ?? '';
      if (input.type === 'radio' || input.type === 'checkbox') {
        input.value = field?.enum?.[0] ?? 'on';
        input.checked = field.value === input.value;
      }
    } else {
      input.multiple = field.type === 'file[]';
    }
    if (field.required) {
      input.setAttribute('required', 'required');
    }
    if (field.description) {
      input.setAttribute('aria-describedby', `${field.id}-description`);
    }
    if (field.minItems) {
      input.dataset.minItems = field.minItems;
    }
    if (field.maxItems) {
      input.dataset.maxItems = field.maxItems;
    }
    if (field.maxFileSize) {
      input.dataset.maxFileSize = field.maxFileSize;
    }
    if (field.default !== undefined) {
      input.setAttribute('value', field.default);
    }
    if (input.type === 'email') {
      input.pattern = emailPattern;
    }
    setConstraintsMessage(element, field.constraintMessages);
    element.dataset.required = field.required;
  }
}

function decoratePanelContainer(panelDefinition, panelContainer) {
  if (!panelContainer) return;

  const isPanelWrapper = (container) => container.classList?.contains('panel-wrapper');

  const shouldAddLabel = (container, panel) => panel.label && !container.querySelector(`legend[for=${container.dataset.id}]`);

  const isContainerRepeatable = (container) => container.dataset?.repeatable === 'true' && container.dataset?.variant !== 'noButtons';

  const needsAddButton = (container) => !container.querySelector(':scope > .repeat-actions');

  const needsRemoveButton = (container) => !container.querySelector(':scope > .item-remove');

  if (isPanelWrapper(panelContainer)) {
    if (shouldAddLabel(panelContainer, panelDefinition)) {
      const legend = createLegend(panelDefinition);
      if (legend) {
        panelContainer.insertAdjacentElement('afterbegin', legend);
      }
    }

    if (isContainerRepeatable(panelContainer)) {
      if (needsAddButton(panelContainer)) {
        insertAddButton(panelContainer, panelContainer);
      }
      if (needsRemoveButton(panelContainer)) {
        insertRemoveButton(panelContainer, panelContainer);
      }
    }
  }
}

function renderField(fd) {
  const fieldType = fd?.fieldType?.replace('-input', '') ?? 'text';
  const renderer = fieldRenderers[fieldType];
  let field;
  if (typeof renderer === 'function') {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  if (fd.description) {
    field.append(createHelpText(fd));
    field.dataset.description = fd.description; // In case overriden by error message
  }
  if (fd.fieldType !== 'radio-group' && fd.fieldType !== 'checkbox-group' && fd.fieldType !== 'captcha') {
    inputDecorator(fd, field);
  }
  return field;
}

export async function generateFormRendition(panel, container, formId, getItems = (p) => p?.items) {
  const items = getItems(panel) || [];
  const promises = items.map(async (field) => {
    field.value = field.value ?? '';
    const { fieldType } = field;
    if (fieldType === 'captcha') {
      captchaField = field;
      const element = createFieldWrapper(field);
      element.textContent = 'CAPTCHA';
      return element;
    }
    const element = renderField(field);
    if (field.appliedCssClassNames) {
      element.className += ` ${field.appliedCssClassNames}`;
    }
    colSpanDecorator(field, element);
    if (field?.fieldType === 'panel') {
      await generateFormRendition(field, element, formId, getItems);
      return element;
    }
    await componentDecorator(element, field, container, formId);
    return element;
  });

  const children = await Promise.all(promises);
  container.append(...children.filter((_) => _ != null));
  decoratePanelContainer(panel, container);
  await componentDecorator(container, panel, null, formId);
}

function enableValidation(form) {
  form.querySelectorAll('input,textarea,select').forEach((input) => {
    input.addEventListener('invalid', (event) => {
      checkValidation(event.target);
    });
  });

  form.addEventListener('change', (event) => {
    checkValidation(event.target);
  });
}

async function createFormForAuthoring(formDef) {
  const form = document.createElement('form');
  await generateFormRendition(formDef, form, formDef.id, (container) => {
    if (container[':itemsOrder'] && container[':items']) {
      return container[':itemsOrder'].map((itemKey) => container[':items'][itemKey]);
    }
    return [];
  });
  return form;
}

export async function createForm(formDef, data) {
  const { action: formPath } = formDef;
  const form = document.createElement('form');
  form.dataset.action = formPath;
  form.noValidate = true;
  if (formDef.appliedCssClassNames) {
    form.className = formDef.appliedCssClassNames;
  }
  const formId = extractIdFromUrl(formPath); // formDef.id returns $form after getState()
  await generateFormRendition(formDef, form, formId);

  let captcha;
  if (captchaField) {
    let config = captchaField?.properties?.['fd:captcha']?.config;
    if (!config) {
      config = {
        siteKey: captchaField?.value,
        uri: captchaField?.uri,
        version: captchaField?.version,
      };
    }
    const pageName = getSitePageName(captchaField?.properties?.['fd:path']);
    captcha = new GoogleReCaptcha(config, captchaField.id, captchaField.name, pageName);
    captcha.loadCaptcha(form);
  }

  enableValidation(form);
  transferRepeatableDOM(form);

  if (afModule) {
    window.setTimeout(async () => {
      afModule.loadRuleEngine(formDef, form, captcha, generateFormRendition, data);
    }, DELAY_MS);
  }

  form.addEventListener('reset', async () => {
    const newForm = await createForm(formDef);
    document.querySelector(`[data-action="${form?.dataset?.action}"]`)?.replaceWith(newForm);
  });

  form.addEventListener('submit', (e) => {
    handleSubmit(e, form, captcha);
  });

  return form;
}

function isDocumentBasedForm(formDef) {
  return formDef?.[':type'] === 'sheet' && formDef?.data;
}

function cleanUp(content) {
  const formDef = content.replaceAll('^(([^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+(\\\\.[^<>()\\\\[\\\\]\\\\\\\\.,;:\\\\s@\\"]+)*)|(\\".+\\"))@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}])|(([a-zA-Z\\\\-0-9]+\\\\.)\\+[a-zA-Z]{2,}))$', '');
  return formDef?.replace(/\x83\n|\n|\s\s+/g, '');
}
/*
  Newer Clean up - Replace backslashes that are not followed by valid json escape characters
  function cleanUp(content) {
    return content.replace(/\\/g, (match, offset, string) => {
      const prevChar = string[offset - 1];
      const nextChar = string[offset + 1];
      const validEscapeChars = ['b', 'f', 'n', 'r', 't', '"', '\\'];
      if (validEscapeChars.includes(nextChar) || prevChar === '\\') {
        return match;
      }
      return '';
    });
  }
*/

function decode(rawContent) {
  const content = rawContent.trim();
  if (content.startsWith('"') && content.endsWith('"')) {
    // In the new 'jsonString' context, Server side code comes as a string with escaped characters,
    // hence the double parse
    return JSON.parse(JSON.parse(content));
  }
  return JSON.parse(cleanUp(content));
}

function extractFormDefinition(block) {
  let formDef;
  const container = block.querySelector('pre');
  const codeEl = container?.querySelector('code');
  const content = codeEl?.textContent;
  if (content) {
    formDef = decode(content);
  }
  return { container, formDef };
}

export async function fetchForm(pathname) {
  // get the main form
  let data;
  let path = pathname;
  if (path.startsWith(window.location.origin) && !path.includes('.json')) {
    if (path.endsWith('.html')) {
      path = path.substring(0, path.lastIndexOf('.html'));
    }
    path += '/jcr:content/root/section/form.html';
  }
  let resp = await fetch(path);

  if (resp?.headers?.get('Content-Type')?.includes('application/json')) {
    data = await resp.json();
  } else if (resp?.headers?.get('Content-Type')?.includes('text/html')) {
    resp = await fetch(path);
    data = await resp.text().then((html) => {
      try {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if (doc) {
          return extractFormDefinition(doc.body).formDef;
        }
        return doc;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Unable to fetch form definition for path', pathname, path);
        return null;
      }
    });
  }
  return data;
}

// Transform JSON functions
function transformJson(inputJson) {
    const result = transformJsonUtil(inputJson);
    const dor = getOrCreateDor(result);
    dor.pageTemplate = defaultPageTemplate.pageTemplate;
    console.log(result);
    return result;
}

const transformJsonUtil = (inputJson) => {
    const result = {};
    for (const key in inputJson) {
        if (inputJson.hasOwnProperty(key)) {
            const value = inputJson[key];
            if (value !== null && Array.isArray(value) && key === "items") {
                transformArray(result, value);
            } else {
                result[key] = value;
            }
        }
    }   
    return result;
}

const transformArray = (result, array) => {
    if (array.length === 0) {
        return;
    }
    result[":items"] = {};
    result[":itemsOrder"] = [];
    for (const item of array) {
        result[":items"][item.id] = transformJsonUtil(item);
        addDorContainer(result[":items"][item.id]);
        result[":itemsOrder"].push(item.id);
    }
}

const addDorContainer = (item) => {
    const fieldTypeJson = fieldTypeBasedJson(formdefTypeToCRISPRType[item.fieldType]);
    const dor = getOrCreateDor(item);
    dor.dorContainer = fieldTypeJson;
    const dataRef = item["dataRef"];
    if(dataRef){
        const bind = {
            "ref": dataRef,
            "match": "dataRef"
        }
        item["properties"]["fd:dor"]["dorContainer"]["bind"] = bind;
    }
}

const getOrCreateDor = (item) => {
    item["properties"] = item["properties"] || {};
    item["properties"]["fd:dor"] = item["properties"]["fd:dor"] || {};
    return item["properties"]["fd:dor"];
}

const formdefTypeToCRISPRType = {
    "date": "datetimefield"
};

const fieldTypeBasedJson = (type) => {
    switch(type){
        case "datetimefield":
           return datefield;
        default:
            return null;
    }
};

export default async function decorate(block) {
  let container = block.querySelector('a[href]');
  let formDef;
  let pathname;
  if (container) {
    ({ pathname } = new URL(container.href));
    formDef = await fetchForm(container.href);
  } else {
    ({ container, formDef } = extractFormDefinition(block));
  }
  let source = 'aem';
  let rules = true;
  let form;
  if (formDef) {
    
    if (isDocumentBasedForm(formDef)) {
      const transform = new DocBasedFormToAF();
      formDef = transform.transform(formDef);
      formDef = transformJson(formDef);
      var headers = new Headers(); 
        headers.append('Authorization', 'Basic ' + btoa('admin:admin'));
        headers.append('Content-Language', 'en-US');
        headers.append('Content-Type', 'application/json;charset=utf-8');
        headers.append('x-adobe-accept-unsupported-api', '1');
        var data = JSON.stringify(formDef);
        var options = {
          method: 'POST',
          body: data,
          headers: headers,
        };

      var response = await fetch('https://7fce-130-248-113-29.ngrok-free.app/adobe/communications/crisprtoxdp', options);
        console.log(response);
      var xdp_res = response.JSON().xdp; 
      console.log(xdp_res); 


      
    //   source = 'sheet';
    //   form = await createForm(formDef);
    //   const docRuleEngine = await import('./rules-doc/index.js');
    //   docRuleEngine.default(formDef, form);
    //   rules = false;
    // } else {
    //   afModule = await import('./rules/index.js');
    //   if (afModule && afModule.initAdaptiveForm && !block.classList.contains('edit-mode')) {
    //     form = await afModule.initAdaptiveForm(formDef, createForm);
    //   } else {
    //     form = await createFormForAuthoring(formDef);
    //   }
    }
    form.dataset.redirectUrl = formDef.redirectUrl || '';
    form.dataset.thankYouMsg = formDef.thankYouMsg || '';
    form.dataset.action = formDef.action || pathname?.split('.json')[0];
    form.dataset.source = source;
    form.dataset.rules = rules;
    form.dataset.id = formDef.id;
    if (source === 'aem' && formDef.properties) {
      form.dataset.formpath = formDef.properties['fd:path'];
    }
    container.replaceWith(form);
  }
}
