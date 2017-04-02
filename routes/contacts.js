var express = require('express');
var router = express.Router({mergeParams:true});
var models = require("../models");


router.post("/:contactId", function(req, res, next) {
    var contact = req.body;

    models.contact.findById(req.params.contactId).then(function(oldcontact) {
	oldcontact.update(contact).then(function(){
	    res.redirect('/customers/'+oldcontact.customerId+'/customercontacts');
	});
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });

});

router.post("/", function(req,res,next){
    var contact = req.body;
    contact.customerId = req.params.id;
    models.contact.create(contact).then(function(contact) {
	res.redirect('/customers/'+contact.customerId+'/customercontacts');
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });

}); 

router.get("/edit/:id", function(req, res, next) {
    models.contact.findById(req.params.id).then(function(contact) {
	res.render('contacts/edit_contacts',{page_title:"Edit Contact",data:contact});
    }).catch(function(errors) {
	res.status(500).send({
	    message: "Failed to perform the operation",
	    error: errors
	});
    });
});

router.get("/add", function(req, res, next) {
    res.render('contacts/add_contacts',{page_title:"Add Contact",customerId:req.params.id});
});

router.get("/delete/:contactId", function(req,res,nest){    
    models.contact.destroy({ where: {id: req.params.contactId}}).then(function(result) {
	res.redirect('/customers/'+req.params.id+'/customercontacts');
    }).catch(function(errors) {
	res.status(500).send({
            message: "Failed to perform the operation",
            error: errors
        });
    });
    
});

module.exports = router;
