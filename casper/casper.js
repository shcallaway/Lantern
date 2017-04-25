casper.test.begin('Application loads without crashing', 1, function(test) {
  casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    this.echo(trace)
  })

  casper.start('http://localhost:9000')

  casper.then(function() {
    this.capture('screenshot.png');
    test.assertTitle('Lantern', 'Page title is Lantern')
    test.assertHttpStatus(200, 'Initial status code is 200')
    test.assertExists('div.Controls', 'Controls are successfully rendered')
  })

  casper.run(function() {
    test.done()
  })
})