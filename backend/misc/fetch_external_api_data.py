import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")

def fetch_and_save_movies(api_key, total_pages=3, filename="movies_data.json"):

    if not api_key:
        print("Error: API Key not found. Check your .env file.")
        return

    base_url = "https://api.themoviedb.org/3/discover/movie"
    image_base_url = "https://image.tmdb.org/t/p/w500"
    all_filtered_movies = []

    for page in range(1, total_pages + 1):
        params = {"api_key": api_key, "page": page}
        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()
            results = response.json().get("results", [])
            
            for movie in results:
                all_filtered_movies.append({
                    "title": movie.get("title"),
                    "release_date": movie.get("release_date"),
                    "rating": movie.get("vote_average"),
                    "description": movie.get("overview"),
                    "image_link": f"{image_base_url}{movie.get('poster_path')}"
                })
        except Exception as e:
            print(f"Error: {e}")

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(all_filtered_movies, f, indent=4)
    print(f"Saved {len(all_filtered_movies)} movies to {filename}")

fetch_and_save_movies(API_KEY)