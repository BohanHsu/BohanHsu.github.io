var schools = school_json

function school_preview(page, num_per_page) {
  // page start from 0
  
  var len = schools.length

  var previews = []

  var i = page * num_per_page

  while (i < (page + 1) * num_per_page) {
    var idx = schools.length - 1 - i

    if (idx < 0) {
      break
    }

    var preview = {}
    var ele = schools[idx]
    preview['id'] = idx
    preview['name'] = ele['School_Name']
    preview['address'] = ele['Location']
    previews.push(preview)
    i += 1
  }

  /*
  schools.forEach(function(ele, idx, arr) {
    if (idx >= page * num_per_page && idx < (page + 1) * num_per_page) {
      var preview = {}
      preview['id'] = idx
      preview['name'] = ele['School_Name']
      preview['address'] = ele['Location']
      previews.push(preview)
    }
  })
  */
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

function is_hyper_link(attr) {
  return attr == 'School_Page_Link' || attr == 'Major_Page_Link' || attr == 'Requirement_Page_Link' || attr == 'Curriculum_Page_Link'
}

function is_multi_value_attr(attr) {
  return attr == 'Special_Requirement' || attr == 'Comment'
}

function program_info(school_idx, program_idx) {
  return schools[school_idx]['programs'][program_idx]
}

function get_program_attrs() {
  var program_attrs = []

  for (var i = 6; i < titles.length; i++) {
    program_attrs.push(titles[i])
  }

  return program_attrs
}

function get_program_attr_display() {
  return {
    'Major': 'Major',
    'Collage': 'Collage',
    'Collage_Ranking': 'Collage Ranking (专业排名)',
    'Major_Page_Link': 'Major Description',
    'Curriculum_Page_Link': 'Curriculum Page Link',
    'Program_Length': 'Length of Study',
    'Spring/Fall_Program': 'Admission in Spring / Fall',
    'Deadline': 'Application Deadline',
    'GPA': 'GPA Requirement',
    'GRE/GMAT': 'GRE / GMAT requirement',
    'Toefl': 'TOEFL Requirement',
    'Recommandation_Letter': 'Recommandation Letter',
    'Personal_Statement': 'Personal Statement',
    'Resume': 'Resume / CV',
    'Special_Requirement': 'Special Requirements',
    'Fee': 'Application Fee',
    'Requirement_Page_Link': 'Requirement Description Page Link',
    'Comment': 'Comment'
  }
}
