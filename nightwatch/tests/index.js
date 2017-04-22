module.exports = {
  before: client => {
  },

  after: client => {
  },

  'application loads without crashing': client => {
    const index = client.page.index()
    index
    .navigate()
    // .assert.title('Lantern')
    .assert.visible('body')
    .assert.visible('@app')
    .assert.visible('@list')
    .assert.visible('@controls')
    client.end()
  },

  'main components render on the page': client => {
    const index = client.page.index()
    index
    .navigate()
    .assert.visible('@controls')
    .assert.visible('@list')
    .assert.visible('@app')
    client.end()
  }

  // 'clicking a track changes the play button': client => {
  //   const index = client.page.index()
  //   .navigate()
  //   .waitForElementVisible('body', 1000)
  //   .assert.visible('@tracks:first-child')
  // }
}