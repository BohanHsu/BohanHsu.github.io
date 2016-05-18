var schools = school_json

function school_preview(page, num_per_page) {
  // page start from 0
  var previews = []

  schools.forEach(function(ele, idx, arr) {
    if (idx >= page * num_per_page && idx < (page + 1) * num_per_page) {
      var preview = {}
      preview['id'] = idx
      preview['name'] = ele['School_Name']
      preview['address'] = ele['Location']
      previews.push(preview)
    }
  })
  return previews
}

function schools_nums() {
  return schools.length
}



function school_info(school_index) {
  return schools[school_index]
}

function get_school_attrs() {
  var school_titles = []

  for (var i = 1; i <= 5; i++) {
    school_titles.push(titles[i])
  }
  return school_titles
}

function get_school_attr_display() {
  return {'School_Name': 'Name',
    'School_Rank': 'University Rank (综合排名)',
    'School_Page_Link': 'School Official Page',
    'Location': 'Address',
    'Admission_Rate': 'Overall Admission Rate'}
}
