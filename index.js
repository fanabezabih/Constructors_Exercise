//1.You are building a feature rollout system for a startup where a FeatureToggle constructor function has properties: featureName (string), isEnabled (boolean), and userGroupAccess (array of strings like "betaTesters", "admins"), and you must use a prototype method canAccess(userRole) to return true or false, a method toggleFeature(flag) to enable or disable the feature, and simulate access attempts using if-else and switch statements for different roles.

function FeatureToggle(featureName, isEnabled, userGroupAccess){
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
}
FeatureToggle.prototype.canAccess = function(userRole) {
    if (!this.isEnabled)
         return false;
    switch (userRole) {
        case 'betaTesters':
        case 'admins':
        case 'regularUsers':
            return this.userGroupAccess.includes(userRole);
        default:
            return false;
    }
};
FeatureToggle.prototype.toggleFeature = function(flag) {
    if (typeof flag === 'boolean') {
        this.isEnabled = flag;
        console.log(`Feature ${this.featureName} ${this.isEnabled ? 'enabled' : 'disabled'}`);
    } else {
        console.log('Invalid flag: Use boolean');
    }
};

const feature = new FeatureToggle('DarkMode', false, ['betaTesters', 'admins']);
console.log(feature.canAccess('betaTesters'));
feature.toggleFeature(true);
console.log(feature.canAccess('betaTesters')); 
console.log(feature.canAccess('regularUsers')); 
feature.toggleFeature('invalid'); 


//2.In a freelancer time-tracking platform, create a TimeLog constructor function with properties: freelancerName (string), projectDetails (object with name and hourlyRate), and logs (array of objects with date, hoursWorked), then add prototype methods to calculate total earnings, filter logs by date range, and determine if weekly hours exceed 40 using if-else logic.


function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs;
  }
  TimeLog.prototype.totalEarnings = function() {
    return this.logs.reduce((total, log) => total + log.hoursWorked * this.projectDetails.hourlyRate, 0);
  };
  TimeLog.prototype.filterByDate = function(startDate, endDate) {
    return this.logs.filter(log => log.date >= startDate && log.date <= endDate);
  };
  TimeLog.prototype.checkWeeklyHours = function() {
    let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
    if (totalHours > 40) {
      console.log("Overtime worked this week!");
    } else {
      console.log("Within normal hours.");
    }
  };

  const log = new TimeLog("Fana", { name: "Web App", hourlyRate: 20 }, [
    { date: "2025-05-01", hoursWorked: 20},
    { date: "2025-05-03", hoursWorked: 25 },
    { date: "2025-05-05", hoursWorked: 30 },
  ]);
  console.log("Total Earnings:", log.totalEarnings());
  log.checkWeeklyHours('2025-05-01');
  log.checkWeeklyHours('2025-05-05');



// 3.You are developing a startup’s order management system where an Order constructor function should contain customer (object with name and email), items (array of objects with productName, quantity, and unitPrice), and status (string), then implement prototype methods to compute total cost, update order status based on payment, and categorize order urgency using switch and conditional statements.


function Order(customer, items, status) {
    this.customer = customer; 
    this.items = items; 
    this.status = status; 
}

Order.prototype.computeTotalCost = function() {
    return this.items.reduce((total, item) => {
        return total + (item.quantity * item.unitPrice);}, 0);
};
Order.prototype.updateStatus = function(paymentReceived) {
    if (paymentReceived) {
      this.status = "Paid";
    } else {
      this.status = "Pending";
    }
  };
  
  Order.prototype.orderUrgency = function() {
    switch (this.status) {
      case "Pending":
        console.log("Order needs urgent attention.");
        break;
      case "Paid":
        console.log("Order is being processed.");
        break;
      default:
        console.log("Order status unknown.");
    }
  };
  
  
let order = new Order({ name: "Hana", email: "hana@example.com" }, [
    { productName: "Iphone 16", quantity: 2, unitPrice: 10 },
    { productName: "Ipad Mini", quantity: 1, unitPrice: 25 }
], "Pending");

console.log("Total:", order.computeTotalCost());
order.updateStatus(true);
order.orderUrgency();

  




    //4. In a startup’s employee review tool, design an Employee class with properties: id (number), name (string), performanceMetrics (object with keys like communication, efficiency, and reliability), and feedback (array of strings), then use prototypes to calculate an average score, classify performance level using control flow, and add new feedback based on conditions.


    class Employee {
    constructor(id, name, performanceMetrics, feedback = []) {
        this.id = id; 
        this.name = name; 
        this.performanceMetrics = performanceMetrics; 
        this.feedback = feedback; 
    }
  
    calculateAverageScore() {
        const metrics = Object.values(this.performanceMetrics);
        return metrics.length ? metrics.reduce((sum, val) => sum + val, 0) / metrics.length : 0;
    }
   
    classifyPerformance() {
        const avgScore = this.calculateAverageScore();
        switch (true) {
            case avgScore >= 90:
                return 'Excellent';
            case avgScore >= 70:
                return 'Good';
            case avgScore >= 50:
                return 'Satisfactory';
            default:
                return 'Needs Improvement';
        }
    }
    addFeedback(comment, isPositive) {
        if (typeof comment !== 'string' || comment.trim() === '') {
            console.log('Invalid feedback: Comment must be a non-empty string');
            return;
        }
        const avgScore = this.calculateAverageScore();
        if (isPositive && avgScore >= 70) {
            this.feedback.push(`Positive: ${comment}`);
            console.log('Positive feedback added');
        } else if (!isPositive && avgScore < 70) {
            this.feedback.push(`Constructive: ${comment}`);
            console.log('Constructive feedback added');
        } else {
            console.log('Feedback not added: Conditions are not met');
        }
    }
}
const employee = new Employee( 101,'Daniel',{ communication: 85, efficiency: 90, reliability:9},[]);

employee.calculateAverageScore()
employee.addFeedback("Great at problem-solving.");
console.log(employee.feedback);





//5.Build a simple e-learning system where a Course class has properties: title (string), instructor (object with name and expertise), and students (array of objects with name and completionStatus), then add prototype methods to return names of students who completed the course, count enrolled students by expertise area, and use control flow to output different messages for instructors with more or less than 5 students.


function Course(title, instructor, students) {
    this.title = title;
    this.instructor = instructor;
    this.students = students;
  }
  
  Course.prototype.completedStudents = function() {
    return this.students.filter(s => s.completionStatus).map(s => s.name);
  };
  
  Course.prototype.countByExpertise = function(expertise) {
    return this.students.filter(s => this.instructor.expertise === expertise).length;
  };
  
  Course.prototype.instructorMessage = function() {
    let count = this.students.length;
    if (count >= 5) {
      console.log(`Instructor ${this.instructor.name} has a full class.`);
    } else {
      console.log(`Instructor ${this.instructor.name} can take more students.`);
    }
  };
  

  let course = new Course("JavaScript Basics", { name: "Mr.Abel", expertise: "Web developer" }, [
    { name: "Abebe", completionStatus: true },
    { name: "Marien", completionStatus: false },
    { name: "Timothy", completionStatus: true },
    { name: "Hana", completionStatus: false },
    { name: "Daniel", completionStatus: true }

  ]);
  
  console.log("Completed:", course.completedStudents());
  course.instructorMessage();
  
























