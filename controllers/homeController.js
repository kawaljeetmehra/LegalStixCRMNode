const Task = require('../models/Task');
const User = require('../models/User');
const Lead = require('../models/Lead');

const showMonthWiseTask = (req, res) => {
    Task.fetchAllTask((error, data) => {
        if (error) {
            res.status(500).json({ status:500, success: false, message: 'Failed to show task.', error: error.message }); //display error
        } else {
            if (!data) {
                  res.status(404).json({ status:404, success: false, message: 'task not fetched!' });
            } else {
                    const currentYear = new Date().getFullYear();

                    const filteredData = data.filter(element => {
                        const date = new Date(element.created_at);
                        return date.getFullYear() === currentYear;
                    });
                    
                    const monthly_data = [];
                    
                    for (let i = 1; i < 13; i++) {
                        const monthName = new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' });
                        monthly_data.push({ month_id: i, monthName: monthName,completed_task: 0, pending_task: 0 });
                    }
                    
                    filteredData.forEach(element => {
                        const date = new Date(element.created_at);
                        const monthId = date.getMonth();
                    
                        if (element.status === 0) {
                            monthly_data[monthId].pending_task++;
                        } else {
                            monthly_data[monthId].completed_task++;
                        }
                    });
                    res.status(200).json({ status:200, success: true, message: 'Data fetched.', data: monthly_data });
            }
        }
    });
}


const fetchUsers = (req, res) => {
    try {
        User.fetchUsers((error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to show users.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'users not fetched!' });
                } else {
                    res.status(200).json({ status:200, success: true, message: 'Users fetched.', data: data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching Users.' });
    }
}


const monthlyLeadReport = (req, res) => {
    try {
        Lead.getleads((error, data) => {
            if (error) {
                res.status(500).json({ status:500, success: false, message: 'Failed to fetch leads.', error: error.message }); //display error
            } else {
                if (!data) {
                      res.status(404).json({ status:404, success: false, message: 'Failed to fetch leads.' });
                } else {
                    const currentYear = new Date().getFullYear();
                    const currentDate = new Date().getDate();
                    const filteredData = data.filter(element => {
                        const date = new Date(element.created_at);
                        return date.getFullYear() === currentYear;
                    });
                    
                    const monthly_data = [];
                    for (let i = 1; i < 13; i++) {
                        const monthName = new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' });
                        monthly_data.push({ month_id: i, monthName: monthName,intrested: 0, not_intrested: 0, total_leads:data.length, today_lead:0 });
                    }
                    
                    filteredData.forEach(element => {
                        const date = new Date(element.created_at);
                        const monthId = date.getMonth();
                        const day = date.getDate();
                        if(currentDate == day){
                              monthly_data[monthId].today_lead++;
                        }
                        if (element.status === 0) {
                            monthly_data[monthId].not_intrested++;
                        } else {
                            monthly_data[monthId].intrested++;
                        }
                    });
                    
                    res.status(200).json({ status:200, success: true, message: 'Leads fetched.', data: monthly_data });
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status:500, error: err.message, success: false, message: 'An error occurred while fetching Leads.' });
    }
}

module.exports = { showMonthWiseTask, fetchUsers, monthlyLeadReport }