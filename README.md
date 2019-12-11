# Two Factor Auth

const twoFactor = require("two-factor-auth")

twoFactor.generateSecret(options)
options.title
options.username
options.url

# Example

const options = {
        title: "exampleTitle"
        username: "exampleUsername",
        url: "exampleURL"
    }

twoFactor.generateSecret(options)

Result
{
    secret: '2WGGYGZ2XFLM5JHGNKL4PC5MLHW7UBYU',
    uri: 'otpauth://totp/exampleUsername%3Fsecret=2WGGYGZ2XFLM5JHGNKL4PC5MLHW7UBYU%26issuer%3DexampleURL',
    qr: 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/exampleUsername%3Fsecret=2WGGYGZ2XFLM5JHGNKL4PC5MLHW7UBYU%26issuer%3DexampleURL'
}