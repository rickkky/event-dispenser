import { EventDispenser } from '../src'

describe('blah', () => {
  it('works', () => {
    let num = 0

    let dispenser = new EventDispenser<{
      'receive-new-num': number
      'retrieve-num': number
    }>()

    dispenser.on('receive-new-num', (newNum) => {
      num = newNum
    })

    dispenser.on('retrieve-num', (thisNum) => {
      expect(thisNum).toEqual(num)
    })

    dispenser.emit('retrieve-num', num)
    dispenser.emit('receive-new-num', 10)
    dispenser.emit('retrieve-num', num)

    expect(num).toEqual(10)
  })
})
