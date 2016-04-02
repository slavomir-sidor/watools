WATools
=======

Web Automation Tools. 
    
Instalation
-----------

	Install dependency node and Mongodb server. Dependent on the target environment, should be independent on it.

	npm install
	npm ./bin/server.js


API
---

	Jobs
	
		Avaiable jobs on WATools. Listed Javasctipt files in the src/SMILA/Job/ directory. Implementation of Webpage job,
		which is run on client web site.
		
		Example GET Request on:

		http://127.0.0.1:3005/jobs
		
		Response:
		 ["AmazonCategoriesPage.js","AmazonCategoryBrandsPage.js","Crawler.js","Curl.js","Google.js","GoogleLogo.js","TestMongo.js","UIWebpagePerformance.js","Webpage.js"]
		 

	Tasks

		Stack of posted tasks. Jobs which will be run on some Worker.
		
		Example GET Request on:
		
		http://127.0.0.1:3005/tasks
		
		Response:
		
		

    BlackBoard
   	
    
    Workers:
    	
    	Example Worker command:
    	{command} {job} {AmazonCategoryCode} {Letter} {Category._id}
    	./node_modules/.bin/phantomjs src/SMILA/Job/AmazonCategoryBrandsPage.js 11051400011 C 56fd5dea7988a8c43e590b