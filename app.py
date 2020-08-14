from flask import Flask,render_template,request,jsonify
from pusher import Pusher
import json
import os

#creating the application
app=Flask(__name__)

#configuring the pusher object

pusher=Pusher(
  app_id=os.environ.get('YOUR_APP_ID'),
  key=os.environ.get('YOUR_APP_KEY'),
  secret=os.environ.get('YOUR_APP_SECRET'),
  cluster='mt1',
  ssl=True
) #get your own credentials from pusher.com

#the app index route

@app.route('/')
def index():
    return render_template('index.html')

#adding a todo item
@app.route('/add-todo',methods=['POST'])
def addTodo():
    data=json.loads(request.data) # this gets the request data as JSON
    pusher.trigger('todo','item-added',data) #trigger the item added event on the todo channel
    return jsonify(data)

#removing a todo item
@app.route('/remove-todo/<item_id>')
def removeItem(item_id):
    data={'id':item_id}
    pusher.trigger('todo','item-removed',data)

#update a todo item
@app.route('/update-todo/<item_id>')
def updateItem(item_id):
    data={
        'id':item_id,
        'completed':json.loads(request.data).get('completed',0)
    }

    pusher.trigger('todo','item-update',data)


#running the app
if __name__ == "__main__":
    app.run(debug=True)


