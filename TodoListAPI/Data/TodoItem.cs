using System.ComponentModel.DataAnnotations;

namespace TodoListAPI.Data
{
    public class TodoItem
    {
        public int Id { get; set; }

        [Required,MaxLength(100)]
        public string Title { get; set; }

        public bool IsDone { get; set; }
    }
}
