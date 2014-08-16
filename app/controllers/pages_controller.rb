class PagesController < ApplicationController
  require_relative '../lib/task.rb'
  $tasks = Array.new()
  $q = 2
  def index
  end
  def robin      
    $tasks = Array.new()                                                                                                   
    @table = JSON.parse(params[:table])
    puts @table
    @table.each do |t|
      $tasks.push(Task.new(t))
    end
    puts $tasks.to_s
    $tasks = $tasks.sort_by {|x| x.entra}
    
   # puts $tasks.to_s
    render :json => { list: round($tasks)}
  end

  def round(tasks)
    @historial = Array.new
    @n = -1
    while tasks.count > 0
      @tempTasks = Array.new
      tasks.each do |t|
        if t.rafaga > $q
          @i = 0
          while @i < $q do
            @historial.push(Task.new("id" => t.id,"rafaga" => @n +=1,"entra" => @historial.count))
            t.rafaga = t.rafaga  - 1
            @i += 1 
          end
        elsif t.rafaga > 0
          @i = 0
          while @i < t.rafaga
            @historial.push(Task.new("id" => t.id,"rafaga" => @n +=1,"entra" => @historial.count))
            @i += 1
          end
          t.rafaga = 0 
        end
        if t.rafaga > 0
          @tempTasks.push(t)
        end
      end
      tasks = @tempTasks
    end
    return  @historial
  end
end