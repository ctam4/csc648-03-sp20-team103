'use strict';
const async = require("async");

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db, callback) => {
  async.series([
      db.createTable.bind(db, "v2_fridges", {
      columns: {
        fridge_id: {
          type: "int",
          unsigned: true,
          length: 32,
          primaryKey: true,
          autoIncrement: true,
        },
        serial_number: {
          type: "string",
          unique: true,
          notNull: true,
        },
        pin: {
          type: "string",
          notNull: true,
        },
        registered_ts: {
          type: "timestamp",
          notNull: true,
        },
      },
      ifNotExists: true,
    }),
    // db.dropTable("sessions", callback),
    // todo: index for fridge_id
    db.createTable.bind(db, "v2_sessions", {
    columns: {
      session: {
        type: "string",
        primaryKey: true,
      },
      fridge_id: {
        type: "int",
        unsigned: true,
        foreignKey: {
          name: "fridge_id_sessions",
          table: "fridges",
          notNull: true,
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "fridge_id",
        },
      },
      //to do: default current timestamp
      logged_in_ts: {
        type: "timestamp",
        notNull: true,
      },
      expires_ts: {
        type: "timestamp",
        notNull: true,
      },
    },
    ifNotExists: true,
    }),

    db.createTable.bind(db, "v2_users", {
      columns: {
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
        notNull: true,
        foreignKey: {
          name: "fridge_id_users",
          table: "fridges",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: "fridge_id",
        },
      },
      name: {
        type: "string",
        length: 64,
        notNull: true,
      },
      role: {
        type: "string",
        length: 64,
        notNull: true,
        unique: true,
      },
      created_ts: {
        type: "timestamp",
        notNull: true,
      }
    },
      ifNotExists: true,
    }),
    
    db.createTable.bind(db, "v2_nutrition", {
      columns: {
        nutrition_id: {
        type: "int",
        unsigned: true,
        length: 32,
        primaryKey: true,
        autoIncrement: true,
      },
      calories: {
        type: "smallint",
        notNull: true,
        unsigned: true,
      },
      calories_unit: {
        type: "string",
        length: 8,
        notNull: true,
      },
      carbohydrates: {
        type: "smallint",
        unsigned: true,
        notNull: true,
      },
      carbohydrates_unit: {
        type: "string",
        unsigned: true,
        notNull: true,
      },
      fat: {
        type: "int",
        unsigned: true,
        notNull: true,
      },
      fat_unit: {
        type: "string",
        length: 8,
        unsigned: true,
        notNull: true,
      },
      protein: {
        type: "smallint",
        unsigned: true,
        notNull: true,
      },
      protein_unit: {
        type: "string",
        length: 8,
        notNull: true,
      },
    },
      ifNotExists: true,
    }),

    db.createTable.bind(db, "v2_ingredients", {
      columns:{
        ingredient_id: {
          type: "int",
          unsigned: true,
          primaryKey:true,
        },
        name: {
          type: "string",
          length: 128,
          unique: true,
          notNull: true,
        },
        image: {
          type: "text",
          notNull: true,
        },
      }
    }),
    
    db.createTable.bind(db, "v2_recipes", {
      columns: {
        recipe_id: {
          type: "int",
          unsigned: true,
          length: 32,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: "string",
          length: 128,
          notNull: true,
          unique: true,
        },
        title: {
          type: "text",
          notNull: true,
        },
        image: {
          type: "text",
          defaultValue: null,
        },
        servings: {
          type: "smallint",
          unsigned: true,
          notNull: true,
        },
        cooking_time: {
          type: "smallint",
          unsigned: true,
          notNull: true,
        },
        instructions: {
          type: "text",
          defaultValue: null,
        },
      },
      ifNotExists: true,
    }),

    db.createTable.bind(db, "v2_recipe_ingredients", {
      columns: {
        recipe_id: {
          type: "int",
          unsigned: true,
          notNull: true,
          foreignKey: {
            name: "item_id",
            table: "items",
            notNull: true,
            rules: {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT",
            },
            mapping: "item_id",
          },
        },
        quantity: {
          type: "real",
          notNull: true,
        },
        unit: {
          type: "string",
          length: 8,
          notNull: true,
        },
      },
      ifNotExists: true,
    }),
    db.createTable.bind(db, "v2_inventory", {
      columns: {
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
          foreignKey: {
            name: "fridge_id_inventory",
            table: "fridges",
            rules: {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT",
            },
            mapping: "fridge_id",
          },
        },
        ingredient_id: {
          type: "int",
          unsigned: true,
          notNull: true,
          foreignKey: {
            name: "product_id",
            table: "products",
            rules: {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT",
            },
            mapping: "product_id",
          },
        },
        expiration_date: {
          type: "timestamp",
          default: null,
        },
        storable_id: {
          type: "int",
          unsigned: true,
          length: 32,
          notNull: true,
          foreignKey: {
            name: "storable_id",
            table: "storables",
            rules: {
              onDelete: "CASCADE",
              onUpdate: "RESTRICT",
            },
            mapping: "storables_id",
          },
        },
        quantity: {
          type: "real",
          notNull: true,
        },
        unit: {
          type: "string",
          length: 16,
          notNull: true,
        },
        price: {
          type: "int",
          notNull: true,
        },
        state: {
          type: "string",
          notNull: true,
          defaultValue: "stored",
        },
      },
      ifNotExists: true,
    }),
  ], callback);
};

exports.down = (db, callback) => {
  async.series([
    //db.dropTable("inventory", callback),
    db.dropTable("v2_fridges", callback),
    db.dropTable("v2_sessions", callback),
    db.dropTable("v2_users", callback),
    db.dropTable("v2_nutrition", callback),
    db.dropTable("v2_recipe_ingredients", callback),
    db.dropTable("v2_inventory", callback),
    db.dropTable("v2_recipes", callback),



    //db.dropTable("users", callback),
    // TODO: all tables
  ], callback);
};

exports._meta = {
  version: 1,
};
