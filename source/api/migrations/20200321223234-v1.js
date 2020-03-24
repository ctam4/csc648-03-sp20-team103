"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.createTable("fridges", {
    fridge_id: {
      type: "int",
      unsigned: true,
      length: 32,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  db.createTable("users", {
    user_id: {
      type: "int",
      unsigned: true,
      autoIncrement: true,
      length: 32,
      primaryKey: true,
    },
    fridge_id: {
      type: "int",
      unsigned: true,
      length: 32,
      primaryKey: true,
      foreignKey: {
        name: "fridge_id",
        table: "fridges",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: "fridge_id",
      },
    },
    name: {
      type: "char",
      length: 64,
      notNull: true,
    },
    role: {
      type: "char",
      length: 64,
      notNull: true,
      unique: true,
    },
  });

  // db.createTable("storables", {
  //   storable_id: {
  //     type: "int",
  //     unsigned: true,
  //     length: 32,
  //     autoIncrement: true,
  //   },
  //   nutrition_id: {
  //     type: "int",
  //     unsigned: true,
  //     length: 32,
  //     foreignKey: {
  //       name: "nutrition_id",
  //       table: "nutrition",
  //       rules: {
  //         onDelete: "CASCADE",
  //         onUpdate: "RESTRICT",
  //       },
  //       mapping: "nutrition_id",
  //     },
  //   },
  //   name: {
  //     type: "char",
  //     length: 64,
  //     notNull: true,
  //     unique: true,
  //   },
  //   image: {
  //     type: "text",
  //   },
  // });

  // db.createTable("recipes", {
  //   recipe_id: {
  //     type: "int",
  //     length: 32,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   nutrition_id: {
  //     type: "int",
  //     unsigned: true,
  //     length: 32,
  //     notNull: true,
  //     foreignKey: {
  //       name: "nutrition_id",
  //       table: "nutrition",
  //       rules: {
  //         onDelete: "CASCADE",
  //         onUpdate: "RESTRICT",
  //       },
  //       mapping: "nutrition_id",
  //     },
  //   },
  //   name: {
  //     type: "char",
  //     length: 64,
  //     notNull: true,
  //     unique: true,
  //   },
  //   image: {
  //     type: "text",
  //     defaultValue: null,
  //   },
  //   servings: {
  //     type: "smallint",
  //     unsigned: true,
  //     notNull: true,
  //   },
  //   cooking_time: {
  //     type: "smallint",
  //     unsigned: true,
  //     notNull: true,
  //     defaultValue: 0,
  //   },
  //   instructions: {
  //     type: "text",
  //     defaultValue: null,
  //   },
  // });

  // db.createTable("nutrition", {
  //   nutrition_id: {
  //     type: "int",
  //     unsigned: true,
  //     length: 32,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   intolerances: {
  //     type: "text",
  //     defaultValue: null,
  //   },
  //   calories: {
  //     type: "smallint",
  //     notNull: true,
  //   },
  //   carbohydrates: {
  //     type: "smallint",
  //     unsigned: true,
  //     notNull: true,
  //   },
  //   fat: {
  //     type: "int",
  //     unsigned: true,
  //     notNull: true,
  //   },
  //   protein: {
  //     type: "smallint",
  //     unsigned: true,
  //     notNull: true,
  //   },
  // });


  db.createTable(
    "inventory",
    {
      inventory_id: {
        type: "int",
        unsigned: true,
        primaryKey: true,
        autoIncrement: true,
      },

      fridge_id: {
        type: "int",
        unsigned: true,
        length: 32,
        notNull: true,
        primaryKey: true,
        foreignKey: {
          name: "fridge_id",
          table: "fridges",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "fridge_id",
        },
      },
      // storable_id: {
      //   type: "int",
      //   unsigned: true,
      //   length: 32,
      //   notNull: true,
      //   foreignKey: {
      //     name: "storable_id",
      //     table: "storables",
      //     rules: {
      //       onDelete: "CASCADE",
      //       onUpdate: "RESTRICT",
      //     },
      //     mapping: "storables_id",
      //   },
      // },
    
      purchase_date: {
        type: "timestamp",
        notNull: true,
        // need to add default curernt timestamp
      },
      purchased_price: {
        type: "smallint",
        unsigned: true,
        notNull: true,
      },
      remaining: {
        type: "real",
        notNull: true,
        defaultValue: 1,
      },
      state: {
        type: "string",
        notNull: true,
        defaultValue: "stored",
      },
    });
    // function (err) {
    //   if (err) return callback(err);
    //   return callback();
    // }

  // db.createTable("expiration", {
  //   inventory_id: {
  //     type: "int",
  //     unsigned: true,
  //     notNull: true,
  //     foreignKey: {
  //       name: "inventory_id",
  //       table: "inventory",
  //       rules: {
  //         onDelete: "CASCADE",
  //         onUpdate: "RESTRICT",
  //       },
  //       mapping: "inventory_id",
  //     },
  //   },
  //   expiration_date: {
  //     type: "timestamp",
  //     defaultValue: null,
  //   },
  // });

  // db.createTable("consumption", {
  //   user_id: {
  //     type: "int",
  //     unsigned: true,
  //     autoIncrement: true,
  //     length: 32,
  //     notNull: true,
  //     foreignKey: {
  //       name: "user_id",
  //       table: "users",
  //       rules: {
  //         onDelete: "CASCADE",
  //         onUpdate: "RESTRICT",
  //       },
  //       mapping: "user_id",
  //     },
  //   },
  //   inventory_id: {
  //     type: "int",
  //     unsigned: true,
  //     primaryKey: true,
  //     autoIncrement: true,
  //     foreignKey: {
  //       name: "inventory_id",
  //       table: "inventory",
  //       rules: {
  //         onDelete: "CASCADE",
  //         onUpdate: "RESTRICT",
  //       },
  //       mapping: "inventory_id",
  //     },
  //   },
  //   consumed_date: {
  //     type: "timestamp",
  //     notNull: true,
  //   },
  // });
};

exports.down = function (db) {
  db.dropTable("inventory", callback);
  //todo: all tables
};

exports._meta = {
  version: 1,
};
