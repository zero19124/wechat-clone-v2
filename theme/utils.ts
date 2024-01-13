import { capitalize } from 'lodash'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

export const parseThemeColors = <T extends Record<string, string>>(
  colors: T,
  property: keyof TextStyle
) => {
  return Object.entries(colors).reduce(
    (obj, [k, v]) => {
      obj[k as keyof T] = {
        [property]: v
      }
      return obj
    },
    {} as { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
  )
}

export const parseThemeText = <T extends Record<string, any[]>>(opts: T) => {
  return Object.entries(opts).reduce(
    (obj, [k, v]) => {
      const [fontSize, fontWeight, fontStyle, color, lineHeight] = v
      obj[k as keyof T] = {
        fontSize,
        fontWeight,
        fontStyle,
        color,
        lineHeight
      }
      return obj
    },
    {} as { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
  )
}

export const parseThemeBorder = <T extends Record<string, any[]>>(opts: T) => {
  return Object.entries(opts).reduce(
    (obj, [k, v]) => {
      const [borderWidth, direction, borderColor] = v
      obj[k as keyof T] = {
        [`border${capitalize(direction)}Width`]: borderWidth,
        [`border${capitalize(direction)}Color`]: borderColor
      }
      return obj
    },
    {} as { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
  )
}
