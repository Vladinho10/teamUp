

 function filter_data(user,access_for_phone){
    let data = Object.assign({},user._doc);
    
    return {
        _id:data._id,
        name: data.name,
        phone: access_for_phone?data.phone:'',
        photo: data.photo,
        own_events: data.own_events,
        attending_events: data.attending_events,
        finished_events: data.finished_events
    }
}

module.exports = filter_data;