/**
 * Объект Type содержит методы для проверки типов значений.
 * @type {Object}
 */
export const Type = {
  isUndefined: value => typeof value === 'undefined',
  isDomElem: value => value instanceof HTMLElement,
  isNull: value => value === 'null',
  isNil: value => value === null || value === undefined,
  isArray: value => !Type.isNil(value) && Array.isArray(value),
  isObjectLike: value => !!value && typeof value === 'object',
  isDate: value => Type.isObjectLike(value) && Type.getTag(value) === '[object Date]',
  isObject: value => !!value && (typeof value === 'object' || typeof value === 'function'),
  isFunction: value => typeof value === 'function',
  isString: value => typeof value === 'string',
  isNumber: value => !Number.isNaN(value) && typeof value === 'number',
  isBlob: value => Type.isObjectLike(value) && Type.isNumber(value.size) && Type.isString(value.type) && Type.isFunction(value.slice),
  isFile: value => Type.isBlob(value) && Type.isString(value.name) && (Type.isNumber(value.lastModified) || Type.isObjectLike(value.lastModifiedDate)),
  getTag: value => Object.prototype.toString.call(value)
};