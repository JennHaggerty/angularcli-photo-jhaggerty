import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  results: string[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void{
    
    fetch('https://api.500px.com/v1/photos?feature=user&username=thejenniferhaggerty&sort=created_at&image_size=5&consumer_key=Ym7KluyuS2Bwxsaz7pd1son0oJDXkxIW2uFnfpPJ').then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(json) {
        const imageUrls = json.photos.map(photo => photo.image_url);
        const el = document.querySelector('#images');
      
        imageUrls.forEach(src => {
          var DOM_img = document.createElement("img");  
          DOM_img.src = src;
          el.appendChild(DOM_img);
        });
      })
      .catch(function(error) { console.log(error); });
  }

}
