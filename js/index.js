$(function () {

	$.ajax({

		// link to xml file
		url: 'a2.xml',
		data: {},
		type: 'GET',
		dataType: 'xml',
		success: function(data) {
			
			// Get data from XML
			var data = $(data);

			// app title and my info
			var app_title = data.find('appTitle').text(); 
			var joon_info = data.find('joonAn');

			// Array to contain images for three movies
			var images = [];

			// Array to store movie titles images for three movies
			var movie_titles = [];

			// Array to include description images for three movies
			var desc = [];

			// Arrays for reviews for three movies
			var review_movie1 = [];
			var review_movie2 = [];
			var review_movie3 = [];

			// To contain casts 
			var cast1 = data.find(`cast:eq(${0})`); 
			var cast2 = data.find(`cast:eq(${1})`); 
			var cast3 = data.find(`cast:eq(${2})`); 
			
			// cast for each movie
			var cast_movie1 = [];
			var cast_movie2 = [];
			var cast_movie3 = [];

			// cast's role of each movie
			var cast_movie1_role = [];
			var cast_movie2_role = [];
			var cast_movie3_role = [];

			// Push all elements into the defined arrays
			//		to simply render to HTML
			for (var i = 0 ; i < 3; i++) {

				images.push(data.find(`title:eq(${i})`).attr('poster'));
				movie_titles.push(data.find(`title:eq(${i})`).text());
				desc.push(data.find(`description:eq(${i})`).text());
					
				cast_movie1.push(cast1.find(`name:eq(${i})`).text());
				cast_movie2.push(cast2.find(`name:eq(${i})`).text());
				cast_movie3.push(cast3.find(`name:eq(${i})`).text());
			
				cast_movie1_role.push(cast1.find(`role:eq(${i})`).text());
				cast_movie2_role.push(cast2.find(`role:eq(${i})`).text());
				cast_movie3_role.push(cast3.find(`role:eq(${i})`).text());
				
				review_movie1.push(data.find(`review:eq(${i})`).text());
				review_movie2.push(data.find(`review:eq(${i+3})`).text());
				review_movie3.push(data.find(`review:eq(${i+6})`).text());

			}

			// Page 1: applying XML data into HTML
			$('div:eq(1)').html(`<h3><center>${ app_title }</center></h3>`);
			
			// To setup swipe function. 
			// It keep the number of swippings confined in a number of movies
			var count = 0;


			// Use swripe to find different movies
		 	$('body').on('swipeleft swiperight', function (e) {

				var eventType = e.type;
				var curPage = $.mobile.activePage[0];
				
				// limit the swipping function only in page 1
				if (curPage.id === 'page1' && eventType === 'swiperight') {
					
					count ++ ;
		
					if(count > 2) count = 2;
					
				}

				if (curPage.id === 'page1' && eventType === 'swipeleft') {

					count --;
					
					if(count < 0) count = 0;
				
				} 

				// swtich pictures and movie titles in terms of limitation above
				$('h3:eq(1)').text(`${movie_titles[count]}`);
				$('img:eq(0)').attr('src', `images/${images[count]}`);
				$('img:eq(0)').attr('alt', `${images[count]}`);
				
			});		 	
			
			// Footer displaying my information		 	
		 	$('center:eq(2)')
				.html(`${ joon_info.text() }<br>
				  	<span><font size="1">(Student ID : ${joon_info.attr('studentNumber')})@
					${joon_info.attr('program')}</font></span>`);


			// ==================== Page 2 ===========================
			
			// To converge information listed above in a single, second page
			var movieTitle;
			var movieImage;
			var castMovie = [];
			var castMovieRole = [];
			var reviewMovie = [];
			var description;

			// header
			$('#header').html(`<h3><center>${ app_title }</center></h3>`);			

			// ========================== Event control =============

			// In order to implement a single page,
			//		use conditional statement
			$('img:eq(0)').on('tap', function(e) {

				// pull out alt's value to compare
				if(e.target.alt === images[0]) {

					// To store JFK movie data
					movieTitle = movie_titles[0];
					movieImage = images[0];
					castMovie = cast_movie1;
					castMovieRole = cast_movie1_role;
					reviewMovie = review_movie1;
					description = desc[0];

				} else if (e.target.alt === images[1]) {

					// To store Fantastic Four movie data
					movieTitle = movie_titles[1];
					movieImage = images[1];
					castMovie = cast_movie2;
					castMovieRole = cast_movie2_role;
					reviewMovie = review_movie2;
					description = desc[1];
				
				} else {

					// To store Planet Ape  movie data
					movieTitle = movie_titles[2];
					movieImage = images[2];
					castMovie = cast_movie3;
					castMovieRole = cast_movie3_role;
					reviewMovie = review_movie3;
					description = desc[2];

				}

				// created table to contain movie post and cast of each movie
				$('#table').html(`

					<table>
					
						<tr>
							<td>
								[${movieTitle}] <br>
								<img src = images/${movieImage} alt = ${movieImage} width = '100'>
							</td>
							<td>
								[Cast & Role]: 

							</td>
						</tr>
										
					</table>
				
			   `);

				// Listing up cast and role
				$('td:eq(1)').empty();
				castMovie.forEach(function (cast) {

					var index = castMovie.indexOf(cast)
					$('td:eq(1)').append(`<p>${cast}<br>: ${castMovieRole[index]}</p>`);

				});
				
				// listing up reviews by utilizing collapsible tag
				reviewMovie.forEach(function(review) {

					var index = reviewMovie.indexOf(review);
					$(`#collap${index+1} p`).text(`${reviewMovie[index]}`);

				});

				$('#collap4 p').text(`${ description}`);

			});

			// Making navigation
			$('ul li').on('tap', function () {
				
				var movieSearch;
				
				// In terms of movies, it makes a different url  
				if(movieTitle === 'JFK') {

					movieSearch = 'tt0102138/?ref_=fn_al_tt_1';
				
				} else if (movieTitle === 'Fantastic Four') {

					movieSearch = 'tt1502712/?ref_=nv_sr_3';
				
				} else {

					movieSearch = 'tt3450958/?ref_=nv_sr_1'; 	
				}

				$('li:eq(0) a').attr('href', `https://www.imdb.com/title/${movieSearch}`);				
				$('li:eq(1) a').attr('href', 'https://www.cineplex.com/Theatre/cineplex-cinemas-oakville-and-vip?'
					+'utm_source=google&utm_medium=organic&utm_campaign=local&utm_content=CPXOakvilleVIP');

			})		

			$('center:eq(4)')
				.html(`${ joon_info.text() }<br>
				  	<span><font size="1">(Student ID : ${joon_info.attr('studentNumber')})@
					${joon_info.attr('program')}</font></span>`);

		}

	});

});