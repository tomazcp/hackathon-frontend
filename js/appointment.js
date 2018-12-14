$(document).ready(function() {

    const $calendar = $("#calendar");
    const $alert = $("#eventAlert");
    const $alertMessageContainer = $(".event-alert-message");
    const timeout = 10000;
    const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
    const baseUrl = 'http://192.168.1.29:8080/hackathon/api/';
    const createAppointmentUrl = baseUrl + 'appointment/add';
    const fetchAppointmentsUrl = 'appointment/list';
    const patientUrl = baseUrl + 'auth/profile';

    /**
     * Edit Title
     * 
     * @param {Object} event 
     * @param {Object} element 
     */
    const editTitle = (event, element) => {
        element.find(".fc-title").click(() => {
            let newTitle = prompt("Event Title: ", event.title);
            
            if (newTitle === null)  return;
            
            const isConfirmed = confirm(`New title: ${newTitle}`);

            if (isConfirmed) {
                $.post(``, { id: event.id, title: newTitle})
                    .done(response => {
                        let alertMessage = JSON.parse(response);

                        handleAlert(alertMessage);

                        $calendar.fullCalendar("refetchEvents");
                    })
                    .fail(() => {
                        $alertMessageContainer.html("Your update request failed..");
                            $alert
                                .addClass("alert alert-danger")
                                .slideDown("fast", "linear");

                            setTimeout(() => {
                                $alert
                                    .slideUp("fast", "linear")
                                    .removeClass();

                                $alertMessageContainer.html("");
                            }, timeout);
                    })
            }
            else {
                return;
            }
        });
    }

    /**
     * Delete Event
     * 
     * @param {Object} event 
     * @param {Object} element 
     */
    const deleteEvent = (event, element) => {
        element.find(".closeon").click(() => {
            const isConfirmed = confirm(`Are you sure you want to delete this event? Event: ${event.title}`);

            if (isConfirmed) {
                $.post(``, { id: event.id })
                    .done(response => {
                        let alertMessage = JSON.parse(response);

                        handleAlert(alertMessage);
                        $calendar.fullCalendar("removeEvents", event._id);
                        $calendar.fullCalendar("refetchEvents");
                    })
                    .fail(() => {
                        $alertMessageContainer.html("Your request failed..");
                        $alert
                            .addClass("alert alert-danger")
                            .slideDown("fast", "linear");

                        setTimeout(() => {
                            $alert
                                .slideUp("fast", "linear")
                                .removeClass();

                            $alertMessageContainer.html("");
                        }, timeout);
                    });
            }
            return;
        });
    }

    function fetchPatient(callback) {
        $.ajax({
            headears: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: patientUrl,
            async: true,
            type: 'GET',
            dataType: 'json',
            success: callback
        });
    }

    $calendar.fullCalendar({
        header: {
            center: "title",
            left: "prev,next,today",
            right: "month,agendaWeek,agendaDay"
        },
        timeFormat: "H(:mm)",
        slotLabelFormat: "HH:mm",
        editable: true,
        droppable: true,
        selectable: true,
        selectHelper: true,
        slotMinutes: 30,
        eventOverlap: false,
        minTime: "08:00:00",
        maxTime: "23:59:00",
        events: function (start, end, timezone, callback) {
            // console.log(start.format());
            // console.log(end.format());
            // $.ajax({
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     url: baseUrl + fetchAppointmentsUrl,
            //     dataType: "json",
            //     type: "GET",
            //     // data: {
            //     //     start: start.format(),
            //     //     end: end.format()
            //     // },
            //     success: (appointments) => {
            //         let events = [];
                    
            //         if (appointments) {
            //             appointments.forEach(appointment => {
            //                 events.push(appointment);
            //             });
            //         }
                    
            //         callback(events);   
            //     }
            // });
            let events = [];
            events.push({
                date: '2018-12-14',
                title: 'Appointment 1'
            }, {
                date: '2018-12-20',
                title: 'Appointment 2'
            }, {
                date: '2018-12-25',
                title: 'Appointment 3'
            });
            callback(events);
        },
        select: function (start, end, jsEvent, view) {
            fetchPatient(function(user) {
                
                const title = prompt("Event name:");
                const eventStart = moment(start).format(dateTimeFormat);
                const eventEnd = moment(end).format(dateTimeFormat);
                let event = {};
                
                if (title) {
                    event = { title, date: eventStart, /*end: eventEnd,*/ patientId: user.id, professionalId: 1 };
                    $calendar.fullCalendar("renderEvent", event, false); // make the event stick false
        
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: 'POST',
                        url: createAppointmentUrl,
                        dataType: 'json',
                        data: JSON.stringify(event),
                        async: true,
                        success: function(res) {
                            $calendar.fullCalendar('refetchEvents');
                        }
                    });
                    // $.post(createAppointmentUrl, event)
                    //     .done(response => {
                    //         let alertMessage = JSON.parse(response);
                            
                    //         handleAlert(alertMessage);
                            
                    //         $calendar.fullCalendar("refetchEvents");
                    //     })
                    //     .fail(() => {

                    // });
            }
                return;
            });
        },
        // eventResize: function({ end, id }, { _milliseconds }, revertFunc, jsEvent, ui, view) {
        //     const newEventEnd = moment(end).format(dateTimeFormat);
        //     const isConfirmed = confirm(`Confirm new event end time? ${newEventEnd}`);
        //     let updatedEvent = {};
            
        //     if (isConfirmed) {
        //         updatedEvent = {
        //             id,
        //             end: newEventEnd
        //         };

        //         $.post(``, updatedEvent)
        //             .done(response => {
        //                 const alertMessage = JSON.parse(response);
                        
        //                 handleAlert(alertMessage);

        //                 $calendar.fullCalendar("refetchEvents");
        //             })
        //             .fail(() => {
        //                 $alertMessageContainer.html("Your update request failed..");
        //                     $alert
        //                         .addClass("alert alert-danger")
        //                         .slideDown("fast", "linear");

        //                     setTimeout(() => {
        //                         $alert
        //                             .slideUp("fast", "linear")
        //                             .removeClass();

        //                         $alertMessageContainer.html("");
        //                     }, timeout);
        //             });
        //     }
        //     $calendar.fullCalendar("refetchEvents");
        //     return;
        // },
        // eventDrop: function(event, delta, revertFunc) {
        //     const isConfirmed = confirm(`Event ${event.title} moved to ${event.start.format(dateTimeFormat)} - ${event.end.format(dateTimeFormat)}`);

        //     if (!isConfirmed) {
        //         revertFunc();
        //     }
        //     else {
        //         let newEvent = {};

        //         newEvent = {
        //             id: event.id,
        //             start: event.start.format(dateTimeFormat),
        //             end: event.end.format(dateTimeFormat)
        //         };

        //         $.post(``, newEvent)
        //             .done(response => {
        //                 let alertMessage = JSON.parse(response);

        //                 handleAlert(alertMessage);

        //                 $calendar.fullCalendar("refetchEvents");
        //             })
        //             .fail(() => {
        //                 $alertMessageContainer.html("Your update request failed..");
        //                 $alert
        //                     .addClass("alert alert-danger")
        //                     .slideDown("fast", "linear");

        //                 setTimeout(() => {
        //                     $alert
        //                         .slideUp("fast", "linear")
        //                         .removeClass();

        //                     $alertMessageContainer.html("");
        //                 }, timeout);
        //             });
        //     }
        // },
        eventRender: function(event, element) {
            element.find(".fc-content").prepend("<span class='closeon'><i class='fa fa-trash' aria-hidden='true'></i>&nbsp</span>");
            editTitle(event, element);
            deleteEvent(event, element);
        },
        eventAfterAllRender: function( view ) { 
            $('.fc-scroller').css('overflow-x', 'visible');
        }
    });

    /**
     * Handle Alert
     * 
     * @param {Object} alertMessage an alert alertMessage object either success or error property 
     */
    const handleAlert = (alertMessage) => {
        alertMessage.hasOwnProperty("success") ? $alert.addClass("alert alert-success") : alertMessageContainer.addClass("alert alert-danger");
        $alertMessageContainer.html(Object.values(alertMessage))
        $alert.slideDown("fast", "linear");

        setTimeout(() => {
            $alert.slideUp("fast", "linear").removeClass();
            $alertMessageContainer.html("");
        }, timeout);
    }

    
});