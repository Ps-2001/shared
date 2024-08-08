const units = {
    layout: ['px', 'em', 'rem', '%', 'vw', 'vh']
}

export const layoutSpacingRegex = new RegExp(
    // Начало строки, допускаем значение 'auto'
    `^(auto|` +

    // Одно число с необязательной единицей измерения
    `(\\d+(${units.layout.join('|')})?)` +

    // От 0 до 3 дополнительных чисел с необязательными единицами измерения, разделенных пробелами
    `(\\s+\\d+(${units.layout.join('|')})?){0,3})$`
)
