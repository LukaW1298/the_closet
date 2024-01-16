import { TreeNode } from 'primevue/treenode';

const list: TreeNode[] = [];

const a: TreeNode = {
    key: "0",           /* category id */
    label: "Oberteil",  /* category name */
    children: [         /* category children */
        {
            key: "1",
            label: "T-Shirt"
        }
    ]

}

list.push(a);

export default [
    {
        key: "0",           /* category id */
        label: "Top",  /* category name */
        selectable: false,
        children: [         /* category children */
            {
                key: "1",
                label: "Tank top"
            },
            {
                key: "2",
                label: "Workout top"
            }
        ]
    
    }
];