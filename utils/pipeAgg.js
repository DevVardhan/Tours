
const pipe = (model , field) =>{
  return model.aggregate([
    {
        $match: {ratingsAverage: {$gte: 4.5}}
    },
    {
        $group: {
            _id:`$${field}`,
            numTours: {$sum: 1},
            numDurations: {$sum: '$duration'},
            avgRating: {$avg: '$ratingsAverage'},
            minPrice: {$min: '$price'},
            maxPrice: {$max: '$price'}
        }
    },{
        $sort: {
            avgRating: 1 // 1 for ascending
        }
    }
  ])  
}

export default pipe ;