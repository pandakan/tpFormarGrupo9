module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex',{
        session: req.session
        });
    }
}