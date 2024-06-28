### DEMO - https://hotel-rooms-app-687w.vercel.app/

## ✌️ Greetings, thank you for your time. For your convenience, I've uploaded a demo.

# Running Application

1.  **Clone the Repository**
    
    First, clone the repository to your local machine. Open a terminal and run the following command:
    
    `git clone https://github.com/ishimoron/hotel-rooms-app.git` 
  

2.  **Navigate to the Application Directory**
    
    Change directory to the application root:
    
    `cd hotel-rooms-app` 
    
    (Optional) Replace `hotel-rooms-app` with the path where you cloned the repository.


3.  **Install Dependencies**

    Run the following command in your terminal:

    `npm install`

    This command uses npm, a build automation tool, to download all the libraries specified in the project's package.json file and install them in the local repository.


4.  **Run Application**

    Run the following command in your terminal:

    `npm run dev`

    This command executes running app locally.
    
#

# Application Features

- **Showing loader why fetching data**: The application show loader if data loaded.

- **Sorting**: Rooms sorted by price and name (additionally by low and high price); User able to change the sorting. (by name,
by price (low and high))

- **Handle and display error message**: Handle and display error message if something wrong (for ex with network).

- **Pagination**: Rooms list paginated, displayed up to 4 elements on each page with arrows to next and prev page and buttons first/last page.

- **Avaiability**: App have a possibility to check rooms avaiability by clicking `Check room` button. After clicking button room data update and display new price (if possible) and badge status `available`,
`onRequest`, `soldout` or `error`.

- **Book button**: Every room contain disable book button wich `clickable` only if status of checked room is `available`.

# Hooks

## useFetch - hook to getting data over the fetch method. 

- hook return [data, loading, error]
used generic in case if data will diffrent from `RoomI[]`

### Usage 
```javascript 
const [data, loading, error] = useFetch<RoomI[]>(`${URL}/rooms`, {
		method: 'GET',
	});
```
Where is 1 - `url`
2 - `params  (method,headers,body)`
