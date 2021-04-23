export const indexPage = (req, res, next) => {
    res.render('layout', {content: 'index', title: 'Corner Restaurant'})
}

export const homePage = (req, res, next) => {
    res.render('layout', {content: 'home', title: 'Corner Restaurant'})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'Corner Restaurant'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content: 'contact', title: 'Corner Restaurant'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'Corner Restaurant'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Corner Restaurant'})
}