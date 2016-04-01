SMILA
=====

POC in node , with mogodb storage.
    
Instalation
-----------

	Install dependency node and Mongodb server. Dependent on the target environment, should be independent on it.



	npm install
	npm ./bin/server.js


API
---

    BlackBoard
   	 
    Jobs
    Tasks 
    Workers:
    	
    	Example Worker command:
    	{command} {job} {AmazonCategoryCode} {Letter} {Category._id}
    	./node_modules/.bin/phantomjs src/SMILA/Job/AmazonCategoryBrandsPage.js 11051400011 C 56fd5dea7988a8c43e590b