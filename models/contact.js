module.exports = function(sequelize, DataTypes) {
    var contact = sequelize.define("contact", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.UUID,
            field: "customer_id",
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            field: "first_name"
        },
        lastName: {
            type: DataTypes.STRING,
            field: "last_name"
        },
        unitNo: {
            type: DataTypes.STRING,
            field:"unit_no"
        },
        streetNo: {
            type: DataTypes.STRING,
            field: "street_no",
            validate : {
		isNumeric : true
	    }
        },
        street: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        province: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.STRING,
            field: "postal_code"
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },        
        division: {
            type: DataTypes.STRING
        },
        salary: {
            type: DataTypes.DOUBLE
        }
    }, {
        createdAt: 'created_date',
        updatedAt: 'updated_date',
        classMethods: {
            associate: function(models) {
                contact.belongsTo(models.customer, {
                    foreignKey: "customer_id",
                    foreignKeyConstraint: true,
		    onDelete: 'cascade'
                });
            },
        },
    });
    
    return contact;
};
