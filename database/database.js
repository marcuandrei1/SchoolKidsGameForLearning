export const createTable = (db, tableName, table_parameters) => {
  db.transaction((tx) => {
    console.log(tx);
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName} ${table_parameters}`,
      [],
      (txObj, Results) => console.log("Table Created ", Results),
      (txObj, error) => console.log("Error ", error)
    );
  });
};

export const addItem = (db, tableName, item) => {
  //console.log(item);
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO ${tableName} ( name , type , image , description ) values ( ? , ? , ? , ? )`,
      [item.name, item.type, item.image, item.description],
      (txObj, ResultsSet) => console.log("Results ", ResultsSet),
      (txObj, error) => console.log("Error ", error)
    );
  }); // end transaction
};

export const addUser = (db, tableName, user_data) => {
  //console.log(item);
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO ${tableName} ( name , avatar , xp , max_day_streak , current_day_streak , fastest_time , longest_perfect_streak , current_perfect_streak ) values ( ? , ? , ? , ? ,? , ? , ? , ? )`,
      [
        user_data.name,
        user_data.avatar,
        user_data.xp,
        user_data.max_day_streak,
        user_data.current_day_streak,
        user_data.fastest_time,
        user_data.longest_perfect_streak,
        user_data.current_perfect_streak,
      ],
      (txObj, ResultsSet) => console.log("Results ", ResultsSet),
      (txObj, error) => console.log("Error ", error)
    );
  }); // end transaction
};

export const updateUserAfterGame = (
  db,
  tableName,
  id,
  added_xp,
  fastest_new_time,
  new_longest_perfect_streak,
  new_current_perfect_streak
) => {
  console.log("test" + added_xp);
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE ${tableName} SET xp = xp + ${added_xp} , fastest_time = ${fastest_new_time} , longest_perfect_streak = ${new_longest_perfect_streak} , current_perfect_streak = ${new_current_perfect_streak} WHERE id = ?`,
      [id],
      (txObj, ResultsSet) => console.log("Results ", ResultsSet),
      (txObj, error) => console.log("Error ", error)
    );
  });
};

export const updateUserXP = (db, tableName, id, added_xp) => {
  console.log("test" + added_xp);
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE ${tableName} SET xp = xp + ${added_xp} WHERE id = ?`,
      [id],
      (txObj, ResultsSet) => console.log("Results ", ResultsSet),
      (txObj, error) => console.log("Error ", error)
    );
  });
};

export const dropTable = (db, tableName) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE ${tableName}`,
      [],
      (txObj, Results) => console.log("Table Dropped ", Results),
      (txObj, error) => console.log("Error ", error)
    );
  }); // end transaction
};
