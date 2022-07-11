const App = {
    data() {
        return {
            writerSelectedDepartment: -1,
            senderSelectedDepartment: -1,
            receiverSelectedDepartment: -1,
            windowTitle: "",                       // for modal window
            modalWindowButtonStyle: "btn-success", // for modal window
            currentIdPhonogram: -1,
            phonogram: {
                item: "",
                registrationDate: "",
                message: "",
                writer: "",
                sender: "",
                receiver: ""
            }
        }
    },
    methods: {
        clearForm() {
            // function clearing text from modal window
            this.phonogram.item = "";
            this.phonogram.registrationDate = "";
            this.phonogram.message = "";

        },
        selectRow() {
            // function highlight selected table row and save current phonogram items
            this.currentIdPhonogram = event.target.getAttribute("phonogram"); // phonogram additional attribute, clicked by <TD>
            var dataTable = document.getElementById("dataTable");             // get table object
            for (var i=1; i<dataTable.rows.length; i++) {
                dataTable.rows[i].style.background = null;                    // remove background for all <TR>
            }
            var selectTableRow = document.getElementById("tr_" + this.currentIdPhonogram);
            selectTableRow.style.background = "#adb5bd";                // set background for selected row
            this.phonogram.item = selectTableRow.cells[0].innerText;    // set phonogram number
            /* get date in format 11.07.2022, change year and day positions, set '-' as delimiter, result: 2022-07-11 */
            this.phonogram.registrationDate = selectTableRow.cells[1].innerText.split(".").reverse().join("-");
            this.phonogram.message = selectTableRow.cells[2].innerText; // set phonogram text message
            /* get fio from cell 'Some organization, Ivanov Ivan Ivanovich' */
            var writerFioInTableRow = selectTableRow.cells[3].innerText.split(",")[1].trimStart();
            for(var i=1;i<this.$refs.writer_id.length;i++) {
                if(this.$refs.writer_id[i].innerText == writerFioInTableRow) { // find index fio in dropdown select
                    this.phonogram.writer = this.$refs.writer_id[i].value;     // set phonogram writer
                }
            }
            // TODO rewrite this
            var senderFioInTableRow = selectTableRow.cells[4].innerText.split(",")[1].trimStart();
            for(var i=1;i<this.$refs.sender_id.length;i++) {
                if(this.$refs.sender_id[i].innerText == senderFioInTableRow) {
                    this.phonogram.sender = this.$refs.sender_id[i].value;
                }
            }
            var receiverFioInTableRow = selectTableRow.cells[5].innerText.split(",")[1].trimStart();
            for(var i=1;i<this.$refs.receiver_id.length;i++) {
                if(this.$refs.receiver_id[i].innerText == receiverFioInTableRow) {
                    this.phonogram.receiver = this.$refs.receiver_id[i].value;
                }
            }

        },
        modalWindowChangeTitleAndButton(windowTitle, operationType) {
            this.windowTitle = windowTitle;                  // change title
            if(operationType == "add") {
                this.modalWindowButtonStyle = "btn-success"; // change style button
                this.$refs.modalForm.action = "/";           // post query to add new phonogram
            }
            if(operationType == "edit") {
                this.modalWindowButtonStyle = "btn-warning";      // change style button
                this.$refs.modalForm.action = "/updatePhonogram"; // post query to edit exist phonogram
            }
        },
        removePhonogram() {
            var currentIdPhonogram = this.currentIdPhonogram;
            if(currentIdPhonogram == -1) {                                  // if user not chose a table row
                alert("Выберите запись для удаления");
            } else {
                if(confirm("Вы уверены, что хотите удалить эту запись?")) { // user confirm to delete
                    var deleteForm = document.createElement("form");        // creating temp form for delete query
                    deleteForm.setAttribute("method","post");
                    deleteForm.setAttribute("action","/removePhonogram");
                    var idSelectedRow = document.createElement("input");
                    idSelectedRow.setAttribute("type", "text");
                    idSelectedRow.setAttribute("name", "id");
                    idSelectedRow.setAttribute("value", currentIdPhonogram); // put current phonogram id into form
                    idSelectedRow.setAttribute("hidden", "true");

                    deleteForm.appendChild(idSelectedRow);
                    document.body.appendChild(deleteForm);
                    deleteForm.submit();
                }
            }
        },
        changeWriterSelectedDepartment() {
            for(var i=1;i<this.$refs.writer_id.length;i++) {
                this.$refs.writer_id[i].style.display = "block";
            }
            for(var i=1;i<this.$refs.writer_id.length;i++) {
                if(this.$refs.writer_id[i].getAttribute("department") != this.writerSelectedDepartment) {
                    this.$refs.writer_id.options[i].style.display = "none";
                }
            }
        },
        changeSenderSelectedDepartment() {
            for(var i=1;i<this.$refs.sender_id.length;i++) {
                this.$refs.sender_id[i].style.display = "block";
            }
            for(var i=1;i<this.$refs.sender_id.length;i++) {
                if(this.$refs.sender_id[i].getAttribute("department") != this.senderSelectedDepartment) {
                    this.$refs.sender_id.options[i].style.display = "none";
                }
            }
        },
        changeReceiverSelectedDepartment() {
            for(var i=1;i<this.$refs.receiver_id.length;i++) {
                this.$refs.receiver_id[i].style.display = "block";
            }
            for(var i=1;i<this.$refs.receiver_id.length;i++) {
                if(this.$refs.receiver_id[i].getAttribute("department") != this.receiverSelectedDepartment) {
                    this.$refs.receiver_id.options[i].style.display = "none";
                }
            }
        }
    }
}

Vue.createApp(App).mount('#vueApp');
