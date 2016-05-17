var schools = school_json

function school_preview(page, num_per_page) {
  // page start from 0
  var previews = []

  schools.forEach(function(ele, idx, arr) {
    if (idx >= page * num_per_page && idx < (page + 1) * num_per_page) {
      var preview = {}
      preview['id'] = idx
      preview['name'] = ele['name']
      preview['address'] = ele['address']
      previews.push(preview)
    }
  })
  return previews
}

function schools_nums() {
  return schools.length
}
