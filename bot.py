#!/usr/bin/env python3

from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext
from telegram.ext.filters import Filters
import datetime
from threading import Thread
from queue import Queue

## environment variables
from os import getenv as env
from dotenv import load_dotenv
load_dotenv()

## database setup
import sqlite3 as db

## create message Queue
insert_q = Queue()

def start_db() -> None:
  with db.connect(env("DB", ":memory:")) as con:
    cur = con.cursor()

    try:
      # create schema
      cur.execute("""CREATE TABLE gastos (
        nombre TEXT,
        precio INT,
        comentario TEXT,
        fecha TEXT);""")
      con.commit()
      print("done")
    except Exception as e:
      print("[MSG]", e)

    while True:
      ## check the queue in case of messages
      while not insert_q.empty():
        data = insert_q.get()
        print("[INSIDE DB THREAD]", data)
        cur.execute("INSERT INTO gastos VALUES (?, ?, ?, ?);", data)
        con.commit()

        insert_q.task_done()


db_loop = Thread(target=start_db)


## callbacks
def add_gasto_callback(update: Update, context: CallbackContext) -> None:
  (amount, *comment) = context.args
  user = update.effective_user.first_name
  data = (user, float(amount), " ".join(comment), str(datetime.datetime.now()))

  print(*data)
  insert_q.put(data)

  # update.message.reply_text(f'Se guardó el mensaje de {update.effective_user.first_name}')


def stats_callback(update: Update, context: CallbackContext) -> None:
  update.message.reply_text('No hay stats todavía')


## updater setup
updater = Updater(env('TOKEN'))
updater.dispatcher.add_handler(CommandHandler("g", add_gasto_callback))
updater.dispatcher.add_handler(CommandHandler("stats", stats_callback))


## run
db_loop.start()
updater.start_polling()
updater.idle()
