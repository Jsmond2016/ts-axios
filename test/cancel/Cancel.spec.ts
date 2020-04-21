/*
 * @Description: 
 * @Date: 2020-04-21 20:22:00
 * @Author: HJ <jinhuang02@hand-china.com>
 * @Copyright: Copyright (c) 2018, Hand
 */

import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  test('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled.')
    expect(cancel.message).toBe('Operation has been canceled.')
  })

  test('should returns true if value is a Cancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })

  test('should returns false if value is not a Cancel', () => {
    expect(isCancel({ foo: 'bar' })).toBeFalsy()
  })
})