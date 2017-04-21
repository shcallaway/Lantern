module.exports = {
  before: client => {
  },

  after: client => {
  },

  'application loads without crashing': client => {
    const index = client.page.index()
    index.navigate()
      .waitForElementVisible('body', 1000)
      .assert.visible('@controls')
      .assert.visible('@list')
    client.end()
  }
}