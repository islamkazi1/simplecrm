module.exports = function(sequelize, DataTypes) {
    var customer = sequelize.define("customer", {
	id : {
	    type : DataTypes.UUID,
	    defaultValue : DataTypes.UUIDV1,
	    primaryKey : true,
	},
	name : {
	    type : DataTypes.STRING,
	},
	unitNo : {
	    type : DataTypes.STRING,
	    field : "unit_no",
	},
	streetNo : {
	    type : DataTypes.STRING,
	    field : "street_no",
	},
	street : {
	    type : DataTypes.STRING,
	},
	city : {
	    type : DataTypes.STRING,
	},
	province : {
	    type : DataTypes.STRING,
	},
	postalCode : {
	    type : DataTypes.STRING,
	    field : "postal_code",
	},
	email : {
	    type : DataTypes.STRING,
	    validate : {
		isEmail : true,
	    },
	},
	phone : {
	    type : DataTypes.STRING,
	},
	fax : {
	    type : DataTypes.STRING,
	}
    }, {
	createdAt : 'created_date',
	updatedAt : 'updated_date',
	classMethods : {
	    associate : function(models) {
		customer.hasMany(models.contact, {
		    foreignKey : "customer_id"
		});
	    }
	}
    });

    return customer;
};