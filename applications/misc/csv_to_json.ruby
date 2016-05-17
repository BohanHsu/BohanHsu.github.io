# stupid script convert csv to json
lines = nil
File.open('school.csv', 'r') do |file|
  lines = file.each_line.map do |l|
    l
    #l[0..-3]
  end
end

lines = lines.map do |l|
  l[0...-2]
end

lines = lines[2...(lines.length)]

comma_sparate_strings = lines.each.map do |line|
  in_quote = false
  strs = [""]
  line.chars.each do |c|
    if !in_quote && c == ','
      strs << ""
    elsif c == '"'
      in_quote = !in_quote
    else
      strs[-1] += "#{c}"
    end
  end

  strs
end

titles = ['Number','School_Name','School_Rank','School_Page_Link','Location','Admission_Rate','Major','Collage','Collage_Ranking','Major_Page_Link','Program_Length','Spring/Fall_Program','Deadline','GPA','GRE/GMAT','Toefl','Recommandation_Letter','Personal_Statement','Resume','Special_Requirement','Fee','Requirement_Page_Link', 'Comment']

schools = []
current_school = nil

def blank_str?(str)
  str.chars.select do |chr|
    chr != " "
  end.length == 0
end

comma_sparate_strings.each do |arr|
  arr.map! do |str|
    blank_str?(str) ? "" : str
  end
end

comma_sparate_strings.each do |arr|
  if arr[0].length > 0
    schools << current_school
    current_school = {}

    (0..5).each do |i|
      current_school[titles[i]] = arr[i]
    end

    current_school['programs'] = []
  end

  current_program = {}
  (6...titles.length).each do |i|
    current_program[titles[i]] = arr[i]
  end
  current_school['programs'] << current_program
end


def print_school(school, titles, is_last)
  puts "  {"
  (1..5).each do |i|
  puts "    \"#{titles[i]}\": \"#{school[titles[i]]}\","
  end

  puts "    \"programs\": ["

  school['programs'].each_with_index do |program, idx|
    puts "  " * 3 + "{"
    (6...titles.length).each do |i|
      if titles[i] == 'Special_Requirement'
        puts "  " * 4 + "\"Special_Requirement\": ["
        puts "  " * 5 + "\"#{program[titles[i]]}\""
        puts "  " * 4 + "],"
      elsif titles[i] == 'Comment'
        puts "  " * 4 + "\"Comment\": ["
        puts "  " * 5 + "\"#{program[titles[i]]}\""
        puts "  " * 4 + "]"

      else
        puts "  " * 4 + "\"#{titles[i]}\": \"#{program[titles[i]]}\"" + (i == titles.length - 1 ? "" : ",")
      end
    end
    puts "  " * 3 + "}" + (idx == school['programs'].length - 1 ? "" : ",")
  end

  puts "    ]"

  puts "  }" + (is_last ? "" : ",")
end

puts "["

schools = schools[1...schools.length]

schools.each_with_index do |sch, idx|
  #p sch
  print_school(sch, titles, (idx == schools.length - 1))
end

#print_school(schools[1], titles, false)

puts "]"
