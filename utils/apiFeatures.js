class apiFeature {
    constructor(query , queryStr){
        this.query = query ; 
        this.queryStr = queryStr ;
    }
    
    filter(){
        let queryObj = {...this.queryStr};
        const excludeFields = ['page' , 'limit' , 'sort' , 'fields'];
        excludeFields.forEach(ele => delete queryObj[ele]);
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, ele => `$${ele}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this ;
    }

    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ').trim();
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }

        return this ;
        
    }

    limitFileds(){
        if(this.queryStr.fields){
            const fieldBy = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fieldBy);
            }else{
            this.query = this.query.select(' ');
        }

        return this ;
    }

    paginate(){
        if(this.queryStr.page){
            const pageNo = this.queryStr.page || 1 *1;
            const pageLimit = this.queryStr.limit || 1 *1;
            
            this.query = this.query.skip((pageNo-1)*pageLimit).limit(pageLimit);
        }else {
            this.query = this.query.limit(5);
        }

        return this ;
    }

}

export default apiFeature ; 