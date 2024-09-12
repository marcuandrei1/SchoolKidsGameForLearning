export const database_names = {
    database_name:"MainDatabase",
    database_words_table:"MainTable",
    database_words_parameters:"(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT , type TEXT ,image TEXT ,description TEXT)",
    database_user_table:"UserTable",
    database_user_parameters: "(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT , avatar TEXT , xp INTEGER , max_day_streak INTEGER , current_day_streak INTEGER , fastest_time INTEGER , longest_perfect_streak INTEGER , current_perfect_streak INTEGER)"
}
