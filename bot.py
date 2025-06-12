import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from dotenv import load_dotenv
import os

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL")

bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def start_handler(message):
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    webapp_button = KeyboardButton("Открыть Mini App", web_app=WebAppInfo(url=WEBAPP_URL))
    markup.add(webapp_button)
    bot.send_message(message.chat.id, "Привет! Нажми кнопку ниже, чтобы открыть мини-приложение.", reply_markup=markup)

bot.infinity_polling()
