using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Ở đây chứa thông tin các trường của Employee
    /// </summary>
    /// Created by : VLVU (27/7/2021)
    class Employee
    {
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public Guid EmployeeCode { get; set; }
        /// <summary>
        /// Tên đầy đủ nhân viên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Mã giới tính
        /// </summary>
        public int Gender { get; set; }
    }
}
