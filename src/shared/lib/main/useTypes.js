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
  getTag: value => Object.prototype.toString.call(value),

  getType: value => {
    if (Type.isUndefined(value)) return 'undefined'
    if (Type.isDomElem(value)) return 'HTMLElement'
    if (Type.isNull(value)) return 'null'
    if (Type.isArray(value)) return 'array'
    if (Type.isObject(value)) return 'object'
    if (Type.isFunction(value)) return 'function'
    if (Type.isString(value)) return 'string'
    if (Type.isNumber(value)) return 'number'
    if (Type.isDate(value)) return 'date'
    if (Type.isBlob(value)) return 'blob'
    if (Type.isFile(value)) return 'file'
    return undefined
  }

}
