class Task
	attr_accessor :id, :rafaga, :entra	
	def initialize(t)
		@id = t["id"]
		@rafaga = t["rafaga"].to_i
		@entra = t["entra"].to_i
	end
end