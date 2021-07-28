<template>
    <div style="height: 100%">
        <table>
            <thead>
                <tr>
                    <th
                        v-for="columnName in columnNames"
                        :key="columnName.key"
                        :class="{'align-center': columnName.align === 'center', 'align-right': columnName.align === 'right'}"
                    >{{columnName.text}}
                        <font-awesome-icon
                            v-if="columnName.sort"
                            icon="sort"
                            style="margin-left: 10px; cursor: pointer;"
                            @click="onSort(columnName.key)"
                        />
                    </th>
                </tr>
            </thead>
            <tbody v-if="data.length !== 0">
                <tr
                    v-for="(item, index) in data"
                    :key="index"
                    @dblclick="(e) => handleDblClickRow(e, item)"
                    @contextmenu="(e) => handleRightClick(e, item)"
                >
                    <td
                        v-for="(value, key) in mapDataFlowHeader(item)"
                        :key="key"
                        :class="setClass(key)"
                    >{{value}}</td>
                </tr>
            </tbody>
        </table>
        <div class="spin">
            <BaseSpin />
        </div>
    </div>
</template>

<script>
/**
 * BaseTable
 * CreatedBy: Vũ Long Vũ 14/7/2021
 */

export default {
    name: "BaseTable",
    emits: ["dblClickRow"],
    props: {
        // columnNames là 1 Array chứa object {key: string, text: string, align: string, sortL boolean, format: string}
        columnNames: {
            type: Array
        },
        // đây là data để bind vào tbody, nó bắt buộc phải có
        dataProps: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    data() {
        return {
            alignColumns: this.columnNames.filter(item => item.align),
            data: this.dataProps
        };
    },

    watch: {
        // data được update khi dataProps được update
        dataProps() {
            this.data = this.dataProps;
        }
    },

    methods: {
        /**
        * Sự kiện khi double click vào 1 row
        * CreatedBy: Vũ Long Vũ 14/7/2021
        */
        handleDblClickRow(e, item) {
            e.preventDefault();
            this.$emit("dblClickRow", item);
        },

        /**
        * Sự kiện khi right click vào 1 row
        * CreatedBy: Vũ Long Vũ 19/7/2021
        */
        handleRightClick(e, item) {
            e.preventDefault();
            this.$emit("rightClick", item, e.pageX, e.pageY);
        },

        /**
        * Thực hiện map dữ liệu theo các trường của theader
        * CreatedBy: Vũ Long Vũ 14/7/2021
        */
        mapDataFlowHeader(item) {
            const newItem = {};
            this.columnNames.forEach(c => {
                switch (c.format) {
                    case "date":
                        Object.assign(newItem, { [c.key]: this.formatDate(item[c.key]) });
                        return;
                    case "currency":
                        Object.assign(newItem, { [c.key]: this.formatCurency(item[c.key]) });
                        return;
                    default:
                        break;
                }

                Object.assign(newItem, { [c.key]: item[c.key] });
            });
            return newItem;
        },

        /**
        * format date
        * CreatedBy: Vũ Long Vũ 14/7/2021
        */
        formatDate(date) {
            if (!date) {
                return "";
            }
            let day = new Date(date).getDate();
            let month = new Date(date).getMonth() + 1;
            const year = new Date(date).getFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;
            return day + "/" + month + "/" + year;
        },

        /**
        * format date
        * CreatedBy: Vũ Long Vũ 14/7/2021
        */
        formatCurency(currency) {
            if (!currency) {
                return "";
            }
            return new Intl.NumberFormat("vn-VN").format(Number(currency));
        },

        /**
        * setClass khi được set trong columnName
        * CreatedBy: Vũ Long Vũ 17/7/2021
        */
        setClass(key) {
            const positionAlign = this.alignColumns.findIndex(item => item.key === key);
            if (positionAlign > -1) {
                return `align-${this.alignColumns[positionAlign].align}`;
            }

            return "";
        },
        /**
        * sort column
        * CreatedBy: Vũ Long Vũ 17/7/2021
        */
        onSort(key) {
            const dataSorted = this.data.sort((a, b) => {
                const lastKeyA = a[key].split(" ").slice(-1).join(" ").toLowerCase();
                const lastKeyB = b[key].split(" ").slice(-1).join(" ").toLowerCase();

                if (lastKeyA < lastKeyB) return -1;
                if (lastKeyA > lastKeyB) return 1;
                return 0;
            });
            this.data = dataSorted;
        }

    }
};
</script>

<style scoped>
table {
    position: relative;
    border-collapse: collapse;
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
}

table thead th {
    background-color: #fff;
    white-space: nowrap;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 10;
}

table th,
td {
    border-bottom: 1px solid #bbbbbb;
    padding: 10px 16px;
    text-align: left;
    white-space: nowrap;
}

table tr:nth-child(even) {
    background-color: #e5e5e5;
}

table tbody tr:hover {
    background-color: #bbbbbb;
    cursor: pointer;
}

.align-center {
    text-align: center !important;
}

.align-right {
    text-align: right !important;
}

.align-left {
    text-align: left !important;
}

.spin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
}
</style>
